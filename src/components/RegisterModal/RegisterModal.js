import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const RegisterModal = ({
  isOpen,
  onRegisterUser,
  onClose,
  switchToLoginModal,
}) => {
  // declare state for each input field (email,password,name,avatarUrl)
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatarLink, setUserAvatarLink] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened (isOpen from input)
  useEffect(() => {
    setUserEmail("");
    setUserPassword("");
    setUserName("");
    setUserAvatarLink("");
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable (for each setXxx)
  function handleUserEmailChange(evt) {
    setUserEmail(evt.target.value);
  }

  function handleUserPasswordChange(evt) {
    setUserPassword(evt.target.value);
  }

  function handleUserNameChange(evt) {
    setUserName(evt.target.value);
  }

  function handleUserAvatarLinkChange(evt) {
    setUserAvatarLink(evt.target.value);
  }

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();
    // call onRegisterUser with appropriate arguments - //CHECKE THIShandleAddItemSubmit
    const new_user = {};
    new_user.email = userEmail;
    new_user.password = userPassword;
    new_user.name = userName;
    new_user.avatar = userAvatarLink;
    onRegisterUser(new_user);
    //console.log(new_user);
  }

  // 2 buttons in form: Next to register, or Login to redirect (added as callback in App.js onClick)
  return (
    <ModalWithForm
      buttonText="Next"
      title="Sign up"
      onClose={onClose}
      name="new-user-signup"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" id="modal-emaillabel">
        Email*
        <input
          className="modal__input"
          id="modal-email"
          type="email"
          name="email"
          placeholder="Email"
          value={userEmail}
          onChange={handleUserEmailChange}
          required
        />
      </label>
      <span className="modal__error" id="modal-email-error"></span>
      <label className="modal__label" id="modal-passwordlabel">
        Password*
        <input
          className="modal__input"
          id="modal-password"
          type="password"
          name="password"
          placeholder="Password"
          value={userPassword}
          onChange={handleUserPasswordChange}
          required
        />
      </label>
      <label className="modal__label" id="modal-namelabel">
        Name
        <input
          className="modal__input"
          id="modal-name"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
      </label>
      <label className="modal__label" id="modal-imagelabel">
        Avatar URL
        <input
          className="modal__input"
          id="modal-link"
          type="url"
          name="link"
          placeholder="Avatar URL"
          value={userAvatarLink}
          onChange={handleUserAvatarLinkChange}
          required
        />
      </label>
      <span className="modal__error" id="modal-link-error"></span>
      <p className="modal__switchlink" onClick={switchToLoginModal}>
        or Log In
      </p>
    </ModalWithForm>
  );
};

export default RegisterModal;
