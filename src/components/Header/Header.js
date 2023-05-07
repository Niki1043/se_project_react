//Header Component
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/headerlogo.svg";
import headerUserAvatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = ({
  cityName,
  onAddButtonClick,
  isLoggedIn,
  handleRegistration,
  handleLogin,
}) => {
  //console.log("Header");
  const currentUser = useContext(CurrentUserContext);
  // console.log(currentUser);
  // const currentUserData = currentUser.data;
  // console.log(currentUserData);
  const currentUserName = currentUser?.data?.name;
  const currentUserAvatar = currentUser?.data?.avatar;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__info-container">
        <Link className="header__logo-link" to="/">
          <img className="header__logo" src={headerLogo} alt="logo" />
        </Link>
        <p className="header__date-city">
          {currentDate}, {cityName}
        </p>
      </div>
      <div className="header__userinfo-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header__add-button"
              type="button"
              onClick={onAddButtonClick}
            >
              + Add Clothes
            </button>
            <Link className="header__userinfo-link" to="/profile">
              <div className="header__username">{currentUserName}</div>
              {currentUserAvatar ? (
                <img
                  className="header__useravatar"
                  src={currentUserAvatar}
                  alt="avatar"
                />
              ) : (
                <p className="header__avatar-letter">{currentUserName[0]}</p>
              )}
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__signup-button"
              onClick={handleRegistration}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__login-button"
              onClick={handleLogin}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
