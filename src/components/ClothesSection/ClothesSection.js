//All clothing items from current app state
import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  cards,
  handleAddClick,
  onSelectCard,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__header-text">Your Items</h2>
        <button
          className="clothes-section__add-button"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__cards-container">
        {cards
          .filter(
            (card) =>
              card.owner ===
              (currentUser.data === undefined ? "" : currentUser.data._id)
          )
          .map((card) => {
            return (
              <ItemCard
                key={card._id}
                item={card}
                onSelectCard={onSelectCard}
                onCardLike={onCardLike}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ClothesSection;
