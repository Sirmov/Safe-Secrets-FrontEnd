import React from 'react';

import { IconEye } from '@tabler/icons-react';

function SignUpCard() {
    return (
        <article className="card card-md">
            <div className="card-body">
                <h2 className="h2 text-center mb-4">Create new account</h2>
                <form action="./" method="get" autoComplete="off" noValidate>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" wfd-id="id0" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" wfd-id="id1" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group input-group-flat">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                autoComplete="off"
                                wfd-id="id2"
                            />
                            <span className="input-group-text">
                                <a
                                    href="#"
                                    className="link-secondary"
                                    data-bs-toggle="tooltip"
                                    aria-label="Show password"
                                    data-bs-original-title="Show password">
                                    <IconEye className="icon" color="currentColor" stroke={2} size={24} />
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-check">
                            <input type="checkbox" className="form-check-input" wfd-id="id3" />
                            <span className="form-check-label">
                                I agree to the{' '}
                                <a href="./terms-of-service.html" tabIndex={-1}>
                                    terms and policy
                                </a>
                                .
                            </span>
                        </label>
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
