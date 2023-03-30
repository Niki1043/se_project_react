//Header Component
import React from "react";
import "./Header.css";
import headerLogo from "../../images/headerlogo.svg";
import headerUserAvatar from "../../images/avatar.svg";

const Header = ({ cityName, onCreateModal }) => {
  //console.log("Header");
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__info-container">
        <img className="header__logo" src={headerLogo} alt="logo" />
        <p className="header__date-city">
          {currentDate}, {cityName}
        </p>
      </div>
      <div className="header__userinfo-container">
        <button
          className="header__add-button"
          type="button"
          onClick={onCreateModal}
        >
          + Add Clothes
        </button>
        <div className="header__username">Terrence Tegegne</div>
        <img
          className="header__useravatar"
          src={headerUserAvatar}
          alt="avatar"
        />
      </div>
    </header>
  );
};

export default Header;
