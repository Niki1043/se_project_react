import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  // declare state for each input field (name, imageUrl, weather)
  const [itemName, setItemName] = useState("");
  const [itemImageLink, setItemImageLink] = useState("");
  const [weatherType, setWeatherType] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened (isOpen from input)
  useEffect(() => {
    setItemName("");
    setItemImageLink("");
    setWeatherType("");
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable (for each setXxx)
  function handleItemNameChange(evt) {
    setItemName(evt.target.value);
  }

  function handleItemImageLinkChange(evt) {
    setItemImageLink(evt.target.value);
  }

  function handleWeatherTypeChange(evt) {
    setWeatherType(evt.target.value);
  }

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();
    // call onAddItem with appropriate arguments - handleAddItemSubmit
    const card = {};
    card.name = itemName;
    card.imageUrl = itemImageLink;
    card.weather = weatherType;
    onAddItem(card);
    //console.log(card); //logs values correctly for input
  }

  //console.log(itemName, itemImageLink, weatherType); logging correctly with handling inputs
  // console.log(itemName);
  // console.log(itemImageLink);
  // console.log(weatherType);

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New Garment"
      onClose={onClose}
      name="new-item-card"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" id="modal-namelabel">
        Name
        <input
          className="modal__input"
          id="modal-name"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={itemName}
          onChange={handleItemNameChange}
          required
        />
      </label>
      <label className="modal__label" id="modal-imagelabel">
        Image
        <input
          className="modal__input"
          id="modal-link"
          type="url"
          name="link"
          placeholder="Image URL"
          value={itemImageLink}
          onChange={handleItemImageLinkChange}
          required
        />
      </label>
      <span className="modal__error" id="modal-link-error"></span>
      <p className="modal__weather-prompter">Select the Weather type:</p>
      <div className="modal__radio-block">
        <div className="modal__radio-buttons">
          <input
            className="modal__radio-button"
            type="radio"
            id="hot"
            value="hot"
            name="weatherType"
            checked={weatherType === "hot"}
            onChange={handleWeatherTypeChange}
          />
          <label className="modal__radio-description">Hot</label>
        </div>
        <div className="modal__radio-buttons">
          <input
            className="modal__radio-button"
            type="radio"
            id="warm"
            value="warm"
            name="weatherType"
            checked={weatherType === "warm"}
            onChange={handleWeatherTypeChange}
          />
          <label className="modal__radio-description">Warm</label>
        </div>
        <div className="modal__radio-buttons">
          <input
            className="modal__radio-button"
            type="radio"
            id="cold"
            value="cold"
            name="weatherType"
            checked={weatherType === "cold"}
            onChange={handleWeatherTypeChange}
          />
          <label className="modal__radio-description">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
