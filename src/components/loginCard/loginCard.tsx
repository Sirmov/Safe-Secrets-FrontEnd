import React, { FormEvent, useState } from 'react';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Auth, useAuthContext } from '@contexts/authContext';

import { LoginUser } from '@models/user/loginUser';

import { ErrorResponse } from '@services/types';
import { login } from '@services/usersService';

import useForm from '@hooks/useForm';
import useValidation from '@hooks/useValidation';

import { loginValidator } from '@validators/user/userLoginValidator';

function LoginCard() {
    const initialValues: LoginUser = { email: '', password: '' };

    const navigate = useNavigate();
    const [revealPassword, setRevealPassword] = useState(false);
    const { setAuth } = useAuthContext();

    const { values, setValues, handleChange, handleSubmit } = useForm(initialValues, handleLogin);
    const { errors, areValid, handleValidation } = useValidation(initialValues, loginValidator);

    async function handleLogin(_event: FormEvent<HTMLFormElement>, data: LoginUser) {
        if (!areValid(data)) {
            return;
        }

        let response = await login(data);
        let isSuccessful = true;

        if (!response.isOk) {
            response = response as AxiosResponse<ErrorResponse>;
            isSuccessful = false;

            if (response.status === 403) {
                toast.warn('Invalid email or password.');
            } else {
                toast.error('Something went wrong.');
            }
        }

        if (isSuccessful) {
            const auth = response.data as Auth;
            setAuth?.(auth);
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
                <h2 className="h2 text-center mb-4">Login to your account</h2>
                <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                    <div className="mb-3">
                        <label htmlFor="login-email" className="form-label">
                            Email address
                        </label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleValidation}
                            className={classNames({
                                'form-control': true,
                                'is-invalid': errors.email,
                            })}
                            value={values.email}
                            placeholder="your@email.com"
                            autoComplete="off"
                        />
                        <div className="invalid-feedback">{errors.email}</div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="login-password" className="form-label">
                            Password
                            <span className="form-label-description">
                                <Link to="/not-implemented">Forgot password?</Link>
                            </span>
                        </label>
                        <div className="row g-2">
                            <div className="col">
                                <input
                                    id="login-password"
                                    name="password"
                                    type={revealPassword ? 'text' : 'password'}
                                    onChange={handleChange}
                                    onBlur={handleValidation}
                                    className={classNames({
                                        'form-control': true,
                                        'is-invalid': errors.password,
                                    })}
                                    value={values.password}
                                    placeholder="your_secret_password"
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
                    <div className="mb-2">
                        <label className="form-check">
                            <input type="checkbox" className="form-check-input" />
                            <span className="form-check-label">Remember me on this device</span>
                        </label>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="btn btn-primary w-100">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </article>
    );
}

export default LoginCard;
