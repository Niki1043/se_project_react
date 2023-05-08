//contains SideBar and ClothesSection
import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  cards,
  handleAddClick,
  onSelectCard,
  onEditProfile,
  onCardLike,
}) {
  return (
    <div className="profile">
      <SideBar handleEditProfile={onEditProfile} />
      <ClothesSection
        cards={cards}
        onClick={handleAddClick}
        onSelectCard={onSelectCard}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
