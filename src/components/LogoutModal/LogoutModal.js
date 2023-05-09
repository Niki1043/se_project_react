import React from "react";
import "./LogoutModal.css";

const LogoutModal = ({ onClose, handleLogout }) => {
  return (
    <div className="modal modal__logout-container">
      <button
        className="modal__logout-popup-close"
        type="button"
        onClick={onClose}
      ></button>
      <div className="modal__logout-message">
        <p className="modal__logout-text">Are you sure you want to log out?</p>
      </div>
      <p className="modal__logout-yes" onClick={handleLogout}>
        Yes, log out
      </p>
      <p className="modal__logout-cancel" onClick={onClose}>
        Cancel
      </p>
    </div>
  );
};

export default LogoutModal;
