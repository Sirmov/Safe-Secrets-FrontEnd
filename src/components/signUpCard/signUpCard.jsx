import React, { useState } from 'react';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';

import * as usersService from '@services/usersService';

import useForm from '@hooks/useForm';
import useValidation from '@hooks/useValidation';

import { signUpValidator } from '@validators/user/userSignUpValidator';

function SignUpCard() {
    const initialValues = { username: '', email: '', password: '', terms: false };

    const navigate = useNavigate();
    const [revealPassword, setRevealPassword] = useState(false);
    const { setAuth } = useAuthContext();

    const { values, setValues, handleChange, handleSubmit } = useForm(initialValues, handleRegister);
    const { errors, areValid, handleValidation } = useValidation(initialValues, signUpValidator);

    async function handleRegister(_event, data) {
        if (!areValid(data)) {
            return;
        }

        const { terms, ...user } = data;
        const response = await usersService.register(user);
        let isSuccessful = true;

        if (response.status === 400) {
            isSuccessful = false;
            toast.error('Invalid data.');
        } else if (response.status === 409) {
            isSuccessful = false;
            toast.error('A user with this email exists already.');
        } else if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            const { _createdOn, ...userData } = response.data;
            setAuth(userData);
            navigate('/');
        } else {
            setValues(initialValues);
        }
    }

    function handleRevealPassword() {
        setRevealPassword((revealPassword) => !revealPassword);
    }

    return (
        <article className="card card-md">
            <div className="card-body">
                <h2 className="h2 text-center mb-4">Create new account</h2>
                <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                    <div className="mb-3">
                        <label htmlFor="register-username" className="form-label">
                            Name
                        </label>
                        <input
                            id="register-username"
                            name="username"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleValidation}
                            className={classNames({
                                'form-control': true,
                                'is-invalid': errors.username,
                            })}
                            value={values.username}
                            placeholder="Enter username"
                        />
                        <div className="invalid-feedback">{errors.username}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="register-email" className="form-label">
                            Email address
                        </label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleValidation}
                            className={classNames({
                                'form-control': true,
                                'is-invalid': errors.email,
                            })}
                            value={values.email}
                            placeholder="Enter email"
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="register-password" className="form-label">
                            Password
                        </label>
                        <div className="row g-2">
                            <div className="col">
                                <input
                                    id="register-password"
                                    name="password"
                                    type={revealPassword ? 'text' : 'password'}
                                    onChange={handleChange}
                                    onBlur={handleValidation}
                                    className={classNames({
                                        'form-control': true,
                                        'is-invalid': errors.password,
                                    })}
                                    value={values.password}
                                    placeholder="Enter password"
                                    autoComplete="off"
                                />
                                <div className="invalid-feedback">{errors.password}</div>
                            </div>
                            <div className="col-auto">
                                <a
                                    onClick={handleRevealPassword}
                                    className="btn btn-icon"
                                    data-bs-toggle="tooltip"
                                    aria-label="Show password"
                                    data-bs-original-title="Show password">
                                    {revealPassword ? <IconEyeOff className="icon" /> : <IconEye className="icon" />}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-check">
                            <input
                                type="checkbox"
                                value={values.terms}
                                checked={values.terms}
                                onChange={handleChange}
                                onBlur={handleValidation}
                                name="terms"
                                className="form-check-input"
                            />
                            <span className="form-check-label">
                                I agree to the{' '}
                                <Link to="/not-implemented" tabIndex={-1}>
                                    terms and policy
                                </Link>
                                .
                            </span>
                        </label>
                        <div className="invalid-feedback d-block">{errors.terms}</div>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="btn btn-primary w-100">
                            Create new account
                        </button>
                    </div>
                </form>
            </div>
        </article>
    );
}

export default SignUpCard;
