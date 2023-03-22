import React, { useContext, useState } from 'react';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthContext from '@contexts/authContext.js';

import * as usersService from '@services/usersService.js';

import useForm from '@hooks/useForm';

import { isStatusOk } from '@utils/_';

function SignUpCard() {
    const allowedData = ['username', 'email', 'password', 'terms'];

    const navigate = useNavigate();
    const [revealPassword, setRevealPassword] = useState(false);
    const { values, errors, handleChange, handleValidation, handleSubmit } = useForm(allowedData, handleRegister);
    const { setAuth } = useContext(AuthContext);

    async function handleRegister(_event, data) {
        const response = await usersService.register(data);

        if (response.status === 400) {
            toast.error('Invalid data.');
        } else if (response.status === 409) {
            toast.error('A user with this email exists already.');
        } else if (!isStatusOk(response.status)) {
            toast.error('Something went wrong.');
        }

        const { _createdOn, ...userData } = response.data;
        const auth = { ...userData, username: data.username };

        setAuth(auth);
        navigate('/');
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
                                    {revealPassword ? (
                                        <IconEyeOff className="icon" color="currentColor" stroke={2} size={24} />
                                    ) : (
                                        <IconEye className="icon" color="currentColor" stroke={2} size={24} />
                                    )}
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
