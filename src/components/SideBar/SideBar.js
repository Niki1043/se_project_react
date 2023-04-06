//Current user's username and avatar hardcoded state
import React from "react";
import "./SideBar.css";
import headerUserAvatar from "../../images/avatar.svg";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img
        className="sidebar__useravatar"
        src={headerUserAvatar}
        alt="avatar"
      />
      <div className="sidebar__username">Terrence Tegegne</div>
    </div>
  );
};

export default SideBar;
