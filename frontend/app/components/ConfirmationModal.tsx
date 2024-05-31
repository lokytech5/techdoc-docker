import React from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
  }

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{message}</h3>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={onConfirm}>Yes</button>
                    <button className="btn btn-ghost" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
