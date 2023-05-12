//import logo from "./logo.svg";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
//import ModalWithForm from "../ModalWithForm/ModalWithForm";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import ItemModal from "../ItemModal/ItemModal";
import {
  getForecastWeather,
  parseWeatherData,
  getWeatherCard,
} from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Profile from "../Profile/Profile";
import { signUp, signIn, checkToken } from "../../utils/auth";
import {
  getClothingItems,
  addClothingItem,
  deleteCard,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import CardDeleteModal from "../CardDeleteModal/CardDeleteModal";
import LogoutModal from "../LogoutModal/LogoutModal";
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
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  // const history = useHistory();

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
        console.log(newCard);
        setCards([...cards, newCard?.data]);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    setLogoutModal(false);
    // history.push("/");
  };

  const openDeleteModal = () => {
    setCardDeleteModal(true);
    handleCloseModal();
  };

  const openLogoutModal = () => {
    setLogoutModal(true);
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
    signIn(email, password)
      .then((res) => {
        //check if successful response and if jwttoken assigned and store and check if token exists already and close modal
        if (res && res.token) {
          //token only inside res object
          localStorage.setItem("jwt", res.token);
          const userinfo = checkToken(res.token);
          //console.log(userinfo);
          return userinfo;
        } else {
          throw { message: "Error: Invalid credentials entered" };
        }
      })
      .then((userinfo) => {
        console.log(userinfo.data);
        setCurrentUser({
          data: {
            name: userinfo?.data?.name,
            avatar: userinfo?.data?.avatar,
            _id: userinfo?.data?._id,
            //...userinfo.data,
          },
        });
        setIsLoggedIn(true);
        handleCloseModal();
        setUserLogInModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //console.log(currentUser);
  // console.log(cards);

  const handleRegistration = ({ name, avatar, email, password }) => {
    signUp(name, avatar, email, password)
      .then((res) => {
        console.log(res);
        handleLogin({ email, password });
        handleCloseModal();
        setUserRegisterModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    editProfile({ name, avatar, token })
      .then((res) => {
        return res;
      })
      .then((res) => {
        //console.log(res);
        setCurrentUser(res);
        handleCloseModal();
        setUserEditProfileModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeClick = (id, isLiked, user) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is now liked
    isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        removeCardLike(id, user, token)
          .then((res) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? res.data : c))
            );
          })
          .catch((err) => console.log(err))
      : addCardLike(id, user, token)
          .then((res) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? res.data : c))
            );
          })
          .catch((err) => console.log(err));
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
        //console.log(data);
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
                  onCardLike={handleLikeClick}
                  onLogOut={openLogoutModal}
                />
              </ProtectedRoute>
              <Route exact path="/">
                <Main
                  cards={cards}
                  weatherTemp={temp}
                  userLoggedIn={isLoggedIn}
                  onSelectCard={handleSelectedCard}
                  weatherCard={weatherInfo}
                  onCardLike={handleLikeClick}
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
                onClose={() => {
                  setUserLogInModal(false);
                }}
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
                onClose={() => {
                  setUserRegisterModal(false);
                }}
                switchToLoginModal={() => {
                  setUserLogInModal(true);
                  setUserRegisterModal(false);
                }}
              />
            )}
            {userEditProfileModal && (
              <EditProfileModal
                isOpen={userEditProfileModal}
                onClose={() => {
                  setUserEditProfileModal(false);
                }}
                onEditProfile={handleEditProfile}
              />
            )}
            {logoutModal && (
              <LogoutModal
                onClose={() => {
                  setLogoutModal(false);
                }}
                handleLogout={handleLogout}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
