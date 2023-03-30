//Item Card Component
import React from "react";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <img
        className="card__image"
        src={item.link}
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
      <div className="card__name-container">
        <p className="card__name">{item.name}</p>
      </div>
    </div>
  );
};

export default ItemCard;
