//import logo from "./logo.svg";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  //const weatherTemp = 30;
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(); //was (0)
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        //console.log(data);
        const cityname = data && data.name;
        setCity(cityname);
        const temperature = parseWeatherData(data);
        console.log(temperature); //up to here logs as an object correctly
        setTemp(temperature);
        console.log(setTemp(temperature)); //returns undefined
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log(temperature);
  //console.log(city);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header cityName={city} onAddButtonClick={handleCreateModal} />
        <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm title="New garment" onClose={handleCloseModal}>
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
                required
              />
            </label>
            <p className="modal__weather-prompter">Select the Weather type:</p>
            <div className="modal__radio-block">
              <div className="modal__radio-buttons">
                <input
                  className="modal__radio-button"
                  type="radio"
                  id="hot"
                  value="hot"
                />
                <label className="modal__radio-description">Hot</label>
              </div>
              <div className="modal__radio-buttons">
                <input
                  className="modal__radio-button"
                  type="radio"
                  id="warm"
                  value="warm"
                />
                <label className="modal__radio-description">Warm</label>
              </div>
              <div className="modal__radio-buttons">
                <input
                  className="modal__radio-button"
                  type="radio"
                  id="cold"
                  value="cold"
                />
                <label className="modal__radio-description">Cold</label>
              </div>
            </div>
          </ModalWithForm>
        )}

        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
