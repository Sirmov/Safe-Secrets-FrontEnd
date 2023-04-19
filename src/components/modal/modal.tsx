import React, { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

interface ModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    size: 'sm' | 'md' | 'lg' | 'full-width';
    header?: ReactNode;
    status: 'success' | 'danger';
    children?: ReactNode;
    footer?: ReactNode;
    goBack: boolean;
}

function Modal({ isVisible, setIsVisible, size, status, header, children, footer, goBack = true }: ModalProps) {
    const navigate = useNavigate();

    function closeModal(event: React.MouseEvent) {
        const targetElement = event.target as Element;

        if (targetElement.id === 'modal-overlay' || targetElement.classList.contains('btn-close')) {
            event.preventDefault();
            event.stopPropagation();
            setIsVisible(false);

            if (goBack) {
                navigate(-1);
            }
        }
    }

    return (
        <>
            {isVisible ? (
                <div
                    className="modal modal-blur fade show"
                    id="modal-overlay"
                    tabIndex={-1}
                    style={{ display: 'block' }}
                    onMouseDown={closeModal}
                    aria-modal="true"
                    role="dialog">
                    <div
                        className={`modal-dialog ${size ? `modal-${size}` : ''} modal-dialog-centered`}
                        role="document">
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
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            )}

                            {status !== undefined ? <div className={`modal-status bg-${status}`} /> : null}

                            <div className="modal-body text-center py-4">{children}</div>

                            {footer !== undefined ? <div className="modal-footer">{footer}</div> : null}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Modal;
