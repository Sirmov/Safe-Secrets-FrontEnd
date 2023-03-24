import React from 'react';

import { Link } from 'react-router-dom';

import styles from './secret.module.scss';

function Secret({ _id, title, text, isEncrypted }) {
    return (
        <div className={`card ${styles['secret-card']}`}>
            <div className="card-header card-header-light">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                <div className="row flex-column align-items-center flex-md-row">
                    <div className="col">{text}</div>
                    <div className="col-auto mt-2 mt-md-0">
                        <button className="btn btn-warning me-2">Update</button>
                        <Link to={`delete/${_id}`} className="btn btn-danger">
                            Delete
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-light">
                <div className="row align-items-center">
                    {isEncrypted ? (
                        <>
                            <div className="col">Secrets is encrypted.</div>
                            <div className="col-auto">
                                <button className="btn btn-success">Decrypt</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col">Secret is visible.</div>
                            <div className="col-auto">
                                <button className="btn btn-info">Hide</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Secret;
