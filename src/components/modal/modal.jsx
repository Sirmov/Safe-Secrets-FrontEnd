import React from 'react';

function Modal({ header, children, footer, status }) {
    return (
        <div
            className="modal modal-blur fade show"
            id="modal-danger"
            tabIndex={-1}
            style={{ display: 'block' }}
            aria-modal="true"
            role="dialog">
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                    {header !== undefined ? (
                        <div className="modal-header">
                            {header}
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                    ) : (
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    )}

                    {status !== undefined ? <div className={`modal-status bg-${status}`} /> : null}

                    <div className="modal-body text-center py-4">{children}</div>

                    {footer !== undefined ? <div className="modal-footer">{footer}</div> : null}
                </div>
            </div>
        </div>
    );
}

export default Modal;
