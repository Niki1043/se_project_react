import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const LoginModal = ({
  isOpen,
  onUserLogin,
  onClose,
  switchToRegisterModal,
}) => {
  // declare state for each input field (email,password)
  const [userLoginEmail, setUserLoginEmail] = useState("");
  const [userLoginPassword, setUserLoginPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened (isOpen from input)
  useEffect(() => {
    setUserLoginEmail("");
    setUserLoginPassword("");
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable (for each setXxx)
  function handleUserLoginEmailChange(evt) {
    setUserLoginEmail(evt.target.value);
  }

  function handleUserLoginPasswordChange(evt) {
    setUserLoginPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();
    // call onRegisterUser with appropriate arguments - //CHECKE THIShandleAddItemSubmit
    const user_login = {};
    user_login.email = userLoginEmail;
    user_login.password = userLoginPassword;
    onUserLogin(user_login);
    //console.log(user_login);
  }

  // 2 buttons in form: Log in to login, or Register to redirect (added as callback in App.js onClick)
  return (
    <ModalWithForm
      buttonText="Log in"
      title="Log in"
      onClose={onClose}
      name="user-login"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" id="modal-emaillabel">
        Email
        <input
          className="modal__input"
          id="modal-email"
          type="email"
          name="email"
          placeholder="Email"
          value={userLoginEmail}
          onChange={handleUserLoginEmailChange}
          required
        />
      </label>
      <span className="modal__error" id="modal-email-error"></span>
      <label className="modal__label" id="modal-passwordlabel">
        Password
        <input
          className="modal__input"
          id="modal-password"
          type="password"
          name="password"
          placeholder="Password"
          value={userLoginPassword}
          onChange={handleUserLoginPasswordChange}
          required
        />
      </label>
      <p className="modal__switchlink" onClick={switchToRegisterModal}>
        or Register
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;
