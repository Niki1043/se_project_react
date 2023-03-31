//WeatherCard Component
import "./WeatherCard.css";
import React from "react";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  //console.log("WeatherCard");
  const imgSrc = weatherOptions.filter((item) => {
    //console.log(item);
    return item.day === day && item.type === type;
  });
  //console.log(imgSrc[0].url);
  const imageSourceUrl = imgSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp}°F</div>
      <img src={imageSourceUrl} alt="sunny-day" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
