//Modal with form component
import React from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
  onSubmit,
}) => {
  //console.log("modalwithform");
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={onClose}
          type="button"
        ></button>
        <h3 className="modal__heading">{title}</h3>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="modal_submit-button " type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
