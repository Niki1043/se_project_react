//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

const latitude = 37.775;
const longitude = -122.419;
const APIkey = "b48e79fb25ff08711ff8ed85b4bd5cd7";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  //console.log(data);
  const main = data.main;
  const temperature = main && main.temp;
  //const cityname = data && data.name;
  //console.log(cityname);
  //console.log(Math.ceil(temperature));
  return Math.ceil(temperature);
};
