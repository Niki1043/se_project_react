//Item Card Component
import React, { useContext, useState } from "react";
import "./ItemCard.css";
import heart_icon from "../../images/heart-icon.svg";
import filled_heart_icon from "../../images/filledheart-icon.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  //console.log(item);
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((user) => user === currentUser?.data?._id);
  // console.log(item);
  // console.log(currentUser?.data?._id);

  const handleLikeClick = () => {
    onCardLike(item._id, isLiked, currentUser);
  };

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
        <img
          src={isLiked ? filled_heart_icon : heart_icon}
          alt="like button"
          className="card__like"
          onClick={handleLikeClick}
        />
      </div>
    </div>
  );
};

export default ItemCard;
