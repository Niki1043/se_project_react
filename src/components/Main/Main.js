import "./Main.css";
import React from "react";
import { useContext } from "react";
//import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ cards, weatherTemp, onSelectCard, weatherCard }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  //console.log(currentTemperatureUnit);

  const getWeatherType = () => {
    if (weatherTemp?.temp?.main >= 86) {
      return "hot";
    } else if (weatherTemp?.main >= 66 && weatherTemp?.temp?.main <= 85) {
      return "warm";
    } else if (weatherTemp?.temp?.main <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();
  //console.log(weatherTemp); //returns weather values with temp object
  //console.log(weatherType); //get weather type return value

  //filteredCards = defaultClothingItems.filter
  const filteredCards = cards.filter((item) => {
    //console.log(item); //object for each item
    return item.weather.toLowerCase() === weatherType;
  });

  //console.log(filteredCards); //returns objects in array for weather temp bracket set above
  return (
    <main className="main">
      <WeatherCard weatherCard={weatherCard} weatherTemp={weatherTemp} />
      <section className="main__card-section" id="card-section">
        <p className="main__weather-text">
          Today is {weatherTemp && weatherTemp.temp[currentTemperatureUnit]} /
          You may want to wear:
        </p>
        <div className="main__card-items">
          {Array.isArray(filteredCards) &&
            filteredCards.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onSelectCard={onSelectCard}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
