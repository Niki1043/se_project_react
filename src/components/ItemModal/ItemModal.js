//Item Modal component
import React, { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, onOpenDeleteModal }) => {
  //console.log('itemmodal')
  const currentUser = useContext(CurrentUserContext);
  console.log(selectedCard.owner);
  console.log(currentUser.data._id);
  // Checking if the current user is the owner of the current clothing item
  const isOwn = selectedCard.owner === currentUser.data._id;

  return (
    <div className={`modal`}>
      <div className="modal__container">
        <button
          className="modal__garment-popup-close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__garment-popup-image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__garment-popup-text">
          <div>
            <div className="modal__garment-popup-name">{selectedCard.name}</div>
            <div className="modal__garment-popup-weather">
              Weather type: {selectedCard.weather}
            </div>
          </div>
          {isOwn ? (
            <button
              type="button"
              className="modal__delete-button"
              onClick={onOpenDeleteModal}
            >
              Delete item
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
