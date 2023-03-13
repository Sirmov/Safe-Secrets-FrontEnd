import React, { useState } from 'react';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

function SignUpCard() {
    const allowedData = ['username', 'email', 'password', 'terms'];

    const [revealPassword, setRevealPassword] = useState(false);
    const [data, setData] = useState(allowedData.reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {}));
    const [errors, setErrors] = useState(allowedData.reduce((acc, curr) => Object.assign(acc, { [curr]: '' }), {}));

    function handleRegister(event) {
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
        validateData(dataKey, dataValue);
    }

    function validateData(dataKey, dataValue) {
        let validationFunction = () => '';

        if (dataKey === 'email') {
            validationFunction = validateEmail;
        } else if (dataKey === 'password') {
            validationFunction = validatePassword;
        } else if (dataKey === 'username') {
            validationFunction = validateUsername;
        } else if (dataKey === 'terms') {
            validationFunction = validateTerms;
        }

        const error = validationFunction(dataValue);
        setErrors({ ...errors, [dataKey]: error });

        return error;
    }

    function validateUsername(username) {
        const errors = [];

        if (username.length < 3 || username.length > 16) {
            errors.push('Username length should be between 3 and 16 characters.');
        } else if (/^[a-zA-Z0-9]+$/.test(username) === false) {
            errors.push('Username should not contains special characters.');
        }

        return errors.join(' ');
    }

    function validateEmail(email) {
        const errors = [];

        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) === false) {
            errors.push('Email is invalid.');
        }

        return errors.join(' ');
    }

    function validatePassword(password) {
        const errors = [];

        if (password.length < 8 || password.length > 32) {
            errors.push('Password length should be between 8 and 32 characters long.');
        } else if (/\d/.test(password) === false) {
            errors.push('Password should include at least one number.');
        } else if (/[A-Z]/.test(password) === false) {
            errors.push('Password should include at least one uppercase character.');
        }

        return errors.join(' ');
    }

    function validateTerms(terms) {
        if (stringToBoolean(terms) == false) {
            return 'You should accept the terms and policy.';
        }

        return '';
    }

    function stringToBoolean(string) {
        if (string === false || String(string).toLowerCase() === 'false') {
            return false;
        } else if (string === true || String(string).toLowerCase() === 'true') {
            return true;
        }

        return Boolean(string);
    }

    function handleRevealPassword() {
        setRevealPassword((revealPassword) => !revealPassword);
    }

    return (
        <article className="card card-md">
            <div className="card-body">
                <h2 className="h2 text-center mb-4">Create new account</h2>
                <form onSubmit={handleRegister} autoComplete="off" noValidate>
                    <div className="mb-3">
                        <label htmlFor="register-username" className="form-label">
                            Name
                        </label>
                        <input
                            id="register-username"
                            name="username"
                            type="text"
                            onChange={handleDataChange}
                            onBlur={handleDataValidation}
                            className={classNames({
                                'form-control': true,
                                'is-invalid': errors.username,
                            })}
                            value={data.username}
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
                            onChange={handleDataChange}
                            onBlur={handleDataValidation}
                            className={classNames({
                                'form-control': true,
                                'is-invalid': errors.email,
                            })}
                            value={data.email}
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
                                    onChange={handleDataChange}
                                    onBlur={handleDataValidation}
                                    className={classNames({
                                        'form-control': true,
                                        'is-invalid': errors.password,
                                    })}
                                    value={data.password}
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
                                value={data.terms}
                                checked={stringToBoolean(data.terms)}
                                onChange={() => setData({ ...data, terms: !stringToBoolean(data.terms) })}
                                onBlur={handleDataValidation}
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
