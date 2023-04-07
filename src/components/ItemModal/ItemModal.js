//Item Modal component
import React from "react";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  //console.log('itemmodal')
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
          <button type="button" className="modal__delete-button">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
