//Current user's username and avatar hardcoded state
import React, { useContext } from "react";
import "./SideBar.css";
//import headerUserAvatar from "../../images/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserName = currentUser?.data?.name;
  const currentUserAvatar = currentUser?.data?.avatar;

  return (
    <div className="sidebar">
      <img
        className="sidebar__useravatar"
        src={currentUserAvatar}
        alt="avatar"
      />
      <div className="sidebar__username">{currentUserName}</div>
      <button
        type="button"
        className="sidebar__edit-profile-button"
        onClick={handleEditProfile}
      >
        Change Profile Data
      </button>
    </div>
  );
};

export default SideBar;
