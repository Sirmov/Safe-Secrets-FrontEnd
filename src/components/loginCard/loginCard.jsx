import React, { useState } from 'react';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import usersService from '@services/usersService.js';

import { useForm } from '@hooks/useForm';
import { useLocalStorage } from '@hooks/useLocalStorage';

function LoginCard() {
    const allowedData = ['email', 'password'];

    const navigate = useNavigate();
    const [revealPassword, setRevealPassword] = useState(false);
    const { values, errors, handleChange, handleValidation, handleSubmit } = useForm(allowedData, handleLogin);
    const [, setAccessToken] = useLocalStorage('accessToken', null);

    async function handleLogin(_event, data) {
        const userData = await usersService.loginEmail(data.email, data.password);
        setAccessToken(userData.accessToken);
        navigate('/');
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
                                    {revealPassword ? (
                                        <IconEyeOff className="icon" color="currentColor" stroke={2} size={24} />
                                    ) : (
                                        <IconEye className="icon" color="currentColor" stroke={2} size={24} />
                                    )}
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
