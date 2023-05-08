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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import { userSignUp, userSignIn, checkToken } from "../../utils/auth";
import {
  getClothingItems,
  addClothingItem,
  deleteCard,
  editProfile,
} from "../../utils/api";
import CardDeleteModal from "../CardDeleteModal/CardDeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  //Set Default useStates
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0); //was (0)
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState();
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]); //was default clothing items
  const [cardDeleteModal, setCardDeleteModal] = useState(false); //delete modal not open on render
  const [userLogInModal, setUserLogInModal] = useState(false);
  const [userRegisterModal, setUserRegisterModal] = useState(false);
  const [userEditProfileModal, setUserEditProfileModal] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Handlers
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

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    addClothingItem({ name, imageUrl, weather, token })
      .then((newCard) => {
        //console.log(newCard);
        setCards([newCard, ...cards]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = () => {
    deleteCard(selectedCard._id, token)
      .then(() => {
        //console.log(selectedCard._id);
        setCards(cards.filter((item) => item._id !== selectedCard._id));
        handleCloseModal();
        setCardDeleteModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDeleteModal = () => {
    setCardDeleteModal(true);
    handleCloseModal();
  };

  const openRegistrationModal = () => {
    setUserRegisterModal(true);
    handleCloseModal();
  };

  const openLoginModal = () => {
    setUserLogInModal(true);
    handleCloseModal();
  };

  const openEditModal = () => {
    setUserEditProfileModal(true);
    handleCloseModal();
  };

  const handleLogin = ({ email, password }) => {
    userSignIn(email, password)
      .then((res) => {
        //check if successful response and if jwttoken assigned and store and check if token exists already and close modal
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          checkToken(res.token);
          return res;
        } else {
          return { message: "Error: Invalid credentials entered" };
        }
      })
      .then((res) => {
        //use the response info as current user and set logged in state to true
        setCurrentUser(res);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    userSignUp(name, avatar, email, password)
      .then((res) => {
        handleLogin({ email, password });
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditProfile = ({ name, avatarUrl }) => {
    const currentToken = localStorage.getItem("jwt");
    console.log(currentToken);
    editProfile({ name, avatarUrl, currentToken })
      .then((res) => {
        return res;
        console.log(res);
      })
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        console.error(err);
      });
  };

  //Server Requests/useEffect Hooks
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

  //get Token from local storage
  useEffect(() => {
    //get item, check stored token with auth, if promise returned/true, set to logged in and set current user data
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
      checkToken(storedToken)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
          return res;
        })
        .then((userdata) => {
          setCurrentUser(userdata);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //Return to render on page
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <div>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              cityName={city}
              onAddButtonClick={handleCreateModal}
              isLoggedIn={isLoggedIn}
              handleRegistration={openRegistrationModal}
              handleLogin={openLoginModal}
            />
            <Switch>
              <ProtectedRoute path="/profile" userLoggedIn={isLoggedIn}>
                <Profile
                  cards={cards}
                  handleAddClick={handleCreateModal}
                  onSelectCard={handleSelectedCard}
                  userLoggedIn={isLoggedIn}
                  onEditProfile={openEditModal}
                />
              </ProtectedRoute>
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
                isOpen={activeModal === "create"}
                onAddItem={handleAddItemSubmit}
                onClose={handleCloseModal}
              />
            )}

            {activeModal === "preview" && (
              <ItemModal
                selectedCard={selectedCard}
                onClose={handleCloseModal}
                onOpenDeleteModal={openDeleteModal}
              />
            )}
            {cardDeleteModal && (
              <CardDeleteModal
                onClose={() => {
                  setCardDeleteModal(false);
                }}
                handleDelete={handleCardDelete}
                onCardDeleted={handleCloseModal}
              />
            )}
            {userLogInModal && (
              <LoginModal
                isOpen={userLogInModal}
                onUserLogin={handleLogin}
                onClose={handleCloseModal}
                switchToRegisterModal={() => {
                  setUserLogInModal(false);
                  setUserRegisterModal(true);
                }}
              />
            )}
            {userRegisterModal && (
              <RegisterModal
                isOpen={userRegisterModal}
                onRegisterUser={handleRegistration}
                onClose={handleCloseModal}
                switchToLoginModal={() => {
                  setUserLogInModal(true);
                  setUserRegisterModal(false);
                }}
              />
            )}
            {userEditProfileModal && (
              <EditProfileModal
                isOpen={userEditProfileModal}
                onClose={handleCloseModal}
                onEditProfile={handleEditProfile}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
