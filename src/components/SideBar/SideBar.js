//Current user's username and avatar hardcoded state
import React, { useContext } from "react";
import "./SideBar.css";
//import headerUserAvatar from "../../images/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ handleEditProfile, handleLogOut }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserName = currentUser?.data?.name;
  const currentUserAvatar = currentUser?.data?.avatar;
  // const currentUserAvatar = null;

  return (
    <div className="sidebar">
      <div className="sidebar__profileinfo">
        {currentUserAvatar ? (
          <img
            className="sidebar__useravatar"
            src={currentUserAvatar}
            alt="avatar"
          />
        ) : (
          <div className="sidebar__useravatar-letter">
            {currentUserName?.[0]}
          </div>
        )}
        <div className="sidebar__username">{currentUserName}</div>
      </div>
      <button
        type="button"
        className="sidebar__edit-profile-button"
        onClick={handleEditProfile}
      >
        Change Profile Data
      </button>
      <button
        type="button"
        className="sidebar__edit-logout-button"
        onClick={handleLogOut}
      >
        Log out
      </button>
    </div>
  );
};

export default SideBar;
