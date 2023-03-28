//WeatherCard Component
import "./WeatherCard.css";

//Create array with all weather types
const weatherOptions = [
  { url: "/images/day/sunny.svg", day: true, type: "sunny" },
  { url: "/images/day/cloudy.svg", day: true, type: "cloudy" },
  { url: "/images/day/rain.svg", day: true, type: "rain" },
  { url: "/images/day/storm.svg", day: true, type: "storm" },
  { url: "/images/day/snow.svg", day: true, type: "snow" },
  { url: "/images/day/fog.svg", day: true, type: "fog" },
  { url: "/images/night/sunny.svg", day: false, type: "sunny" },
  { url: "/images/night/cloudy.svg", day: false, type: "cloudy" },
  { url: "/images/night/rain.svg", day: false, type: "rain" },
  { url: "/images/night/storm.svg", day: false, type: "storm" },
  { url: "/images/night/snow.svg", day: false, type: "snow" },
  { url: "/images/night/fog.svg", day: false, type: "fog" },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  //console.log("WeatherCard");
  const imgSrc = weatherOptions.filter((i) => {
    //console.log(i);
    return i.day === day && i.type === type;
  });
  //console.log(imgSrc[0].url);
  const imageSourceUrl = imgSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp}</div>
      <img src={imageSourceUrl} alt="sunny-day" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
