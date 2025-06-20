import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children, title, noFull = true }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className="modal d-block show"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div
                className={`modal-dialog ${noFull ? "modal-lg modal-dialog-centered" : "modal-fullscreen"}`}
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        >
                        </button>
                    </div>
                    <div className="modal-body overflow-auto" style={{ maxHeight: noFull ? "70vh" : "calc(95vh - 64px)" }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
