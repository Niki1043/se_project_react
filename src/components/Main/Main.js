import "./Main.css";
import React from "react";
import { useContext } from "react";
import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTempUnit);

  const getWeatherType = () => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();
  console.log(weatherTemp); //returns weather values with temp object
  console.log(weatherTemp.temp); //temp object
  //console.log(weatherTemp.temp[currentTempUnit]); //undefined
  //console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    //console.log(item._id);
    return item.weather.toLowerCase() === weatherType;
  });

  //console.log(filteredCards);
  return (
    <main className="main">
      <WeatherCard
        day={true}
        type="rain"
        weatherTemp={weatherTemp && weatherTemp.temp[currentTempUnit]}
      />
      <section className="main__card-section" id="card-section">
        <p className="main__weather-text">
          Today is {weatherTemp && weatherTemp.temp[currentTempUnit]} / You may
          want to wear:
        </p>
        <div className="main__card-items">
          {filteredCards.map((item) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
