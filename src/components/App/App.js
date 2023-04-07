//import logo from "./logo.svg";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ItemModal from "../ItemModal/ItemModal";
import {
  getForecastWeather,
  parseWeatherData,
  getWeatherCard,
} from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
//import { defaultClothingItems } from "../../utils/constants";
import { getClothingItems, addClothingItem, deleteCard } from "../../utils/api";

function App() {
  //const weatherTemp = 30;
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0); //was (0)
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]); //was default clothing items

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

  // const handleAddItemSubmit = (newUserCard) => {
  //   addClothingItem(newUserCard)
  //     .then((data) => {
  //       console.log(data);
  //       const newCard = newUserCard;
  //       newCard.id = data.id;
  //       setCards([newCard, ...cards]);
  //       handleCloseModal();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleAddItemSubmit = (name, imageUrl, weather) => {
    addClothingItem({ name, imageUrl, weather })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (id) => {
    deleteCard(id).then(() => {
      console.log(id);
    });
  };

  //Get and set weather info and city name for header and weather card
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        //console.log(data);
        const cityname = data && data.name;
        setCity(cityname);
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const weatherCardInfo = getWeatherCard(data);
        setWeatherInfo(weatherCardInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //console.log(temperature);
  //console.log(city);
  //console.log(temp);//logs with values and units
  //console.log(weatherTemp);

  //get Clothing info for cards in server
  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setCards(data);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header cityName={city} onAddButtonClick={handleCreateModal} />
          <Switch>
            <Route path="/profile">
              <Profile
                cards={cards}
                handleAddClick={handleCreateModal}
                onSelectCard={handleSelectedCard}
              />
            </Route>
            <Route exact path="/">
              <Main
                cards={cards}
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                weatherCard={weatherInfo}
              />
            </Route>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              // isOpen={activeModal === "create"}
              onAddItem={handleAddItemSubmit}
              onClose={handleCloseModal}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
