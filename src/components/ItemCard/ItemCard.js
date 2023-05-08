//Item Card Component
import React, { useContext } from "react";
import "./ItemCard.css";
import heart_icon from "../../images/heart-icon.svg";
import filled_heart_icon from "../../images/filledheart-icon.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  //console.log(item);

  // add useContext const
  //add is liked const
  // add handle like
  //addheart images to the card next to the main descriptor text item.name

  return (
    <div className="card">
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
      <div className="card__name-container">
        <p className="card__name">{item.name}</p>
        <img src={heart_icon} alt="like button" className="card__like" />
      </div>
    </div>
  );
};

export default ItemCard;
