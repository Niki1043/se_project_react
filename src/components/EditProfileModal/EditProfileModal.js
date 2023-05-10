import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserName = currentUser?.data?.name;
  const currentUserAvatar = currentUser?.data?.avatar;

  // declare state for each input field (email,password,name,avatarUrl)
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  // use a useEffect hook to reset the input field state to current user info when
  // the modal is opened (isOpen from input)
  useEffect(() => {
    setUserName(currentUserName);
    setUserAvatar(currentUserAvatar);
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable (for each setXxx)
  function handleUserNameChange(evt) {
    setUserName(evt.target.value);
  }

  function handleUserAvatarChange(evt) {
    setUserAvatar(evt.target.value);
  }

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();
    // call onRegisterUser with appropriate arguments - //CHECKE THIShandleAddItemSubmit
    const update_user = {};
    update_user.name = userName;
    update_user.avatar = userAvatar;
    onEditProfile(update_user);
    //console.log(new_user);
  }

  // Update Profile form with one button to submit
  return (
    <ModalWithForm
      buttonText="Save changes"
      title="Change Profile Data"
      onClose={onClose}
      name="user-profile-edit"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" id="modal-namelabel">
        Name*
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
        Avatar
        <input
          className="modal__input"
          id="modal-link"
          type="url"
          name="link"
          placeholder="Avatar URL"
          value={userAvatar}
          onChange={handleUserAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
