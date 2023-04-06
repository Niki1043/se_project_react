//Header Component
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/headerlogo.svg";
import headerUserAvatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Header = ({ cityName, onAddButtonClick }) => {
  //console.log("Header");
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
        <button
          className="header__add-button"
          type="button"
          onClick={onAddButtonClick}
        >
          + Add Clothes
        </button>
        <Link className="header__userinfo-link" to="/profile">
          <div className="header__username">Terrence Tegegne</div>
          <img
            className="header__useravatar"
            src={headerUserAvatar}
            alt="avatar"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
