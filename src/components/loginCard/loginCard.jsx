import React, { useState } from 'react';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { validateData } from '@utils/validation';

function LoginCard() {
    const allowedData = ['email', 'password'];

    const [revealPassword, setRevealPassword] = useState(false);
    const [data, setData] = useState(allowedData.reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {}));
    const [errors, setErrors] = useState(allowedData.reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {}));

    function handleLogin(event) {
        event.preventDefault();

        event.preventDefault();

        let errors = Object.entries(data).reduce((acc, [k, v]) => Object.assign(acc, { [k]: validateData(k, v) }), {});
        let isValid = !Object.values(errors).some((e) => e.length > 0);

        if (!isValid) {
            setErrors(errors);
        } else {
            // ToDo send request
        }
    }

    function handleDataChange(event) {
        const dataKey = event.currentTarget.name;
        const dataValue = event.currentTarget.value;

        setData({ ...data, [dataKey]: dataValue });
    }

    function handleDataValidation(event) {
        const dataKey = event.currentTarget.name;
        const dataValue = event.currentTarget.value;
        const error = validateData(dataKey, dataValue);

        setErrors({ ...errors, [dataKey]: error });
    }

    function handleRevealPassword() {
        setRevealPassword((revealPassword) => !revealPassword);
    }

    return (
        <article className="card card-md">
            <div className="card-body">
                <h2 className="h2 text-center mb-4">Login to your account</h2>
                <form onSubmit={handleLogin} autoComplete="off" noValidate>
                    <div className="mb-3">
                        <label htmlFor="login-email" className="form-label">
                            Email address
                        </label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            onChange={handleDataChange}
                            onBlur={handleDataValidation}
                            className={classNames({
                                'form-control': true,
                                'is-invalid': errors.email,
                            })}
                            value={data.email}
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
                                    onChange={handleDataChange}
                                    onBlur={handleDataValidation}
                                    className={classNames({
                                        'form-control': true,
                                        'is-invalid': errors.password,
                                    })}
                                    value={data.password}
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
