import React from "react";
import "./CardDeleteModal.css";

const CardDeleteModal = ({ onClose, handleDelete }) => {
  return (
    <div className="modal modal__delete-container">
      <button
        className="modal__delete-popup-close"
        type="button"
        onClick={onClose}
      ></button>
      <div className="modal__delete-message">
        <p className="modal__delete-text">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__delete-text">This action is irreversable.</p>
      </div>
      <p className="modal__delete-yes" onClick={handleDelete}>
        Yes, delete item
      </p>
      <p className="modal__delete-cancel" onClick={onClose}>
        Cancel
      </p>
    </div>
  );
};

export default CardDeleteModal;
