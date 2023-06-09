//contains SideBar and ClothesSection
import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  cards,
  handleAddClick,
  onSelectCard,
  userLoggedIn,
  onEditProfile,
  onCardLike,
  onLogOut,
}) {
  return (
    <div className="profile">
      <SideBar handleEditProfile={onEditProfile} handleLogOut={onLogOut} />
      <ClothesSection
        cards={cards}
        handleAddClick={handleAddClick}
        onSelectCard={onSelectCard}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
