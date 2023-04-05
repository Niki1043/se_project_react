//WeatherCard Component
import "./WeatherCard.css";
import React from "react";
import { useContext } from "react";
import { weatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  //console.log("WeatherCard");
  const imgSrc = weatherOptions.filter((item) => {
    //console.log(item);
    return item.day === day && item.type === type;
  });
  //console.log(imgSrc[0].url);
  //console.log(weatherTemp);
  const imageSourceUrl = imgSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp && weatherTemp.temp[currentTempUnit]}
      </div>
      <img src={imageSourceUrl} alt="sunny-day" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
