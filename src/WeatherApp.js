import React, { useState } from "react";
import "./Weatherapp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function WeatherApp() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    data: {},
    error: false,
  });
  const [date, setDate] = useState(new Date());

  const todaysDate = () => {};

  const search = async (event) => {
    event.preventDefault();
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const api_key = "f00c38e0279b7bc85480c3fe775d518c";
    if (!input) {
      alert("Enter your city.");
    } else {
      axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          console.log(res.data);
          setWeather({ data: res.data });
          setInput("");
        })
        .catch((error) => {
          console.log(error);
          setWeather({ data: {}, error: true });
        });
    }
  };
  return (
    <div className="main">
      <div id="app">
        <h1 id="heading"> Weather App</h1>
        <div id="searchBarDiv">
          <input
            id="searchBar"
            type="text"
            plceholder="Enter your City..."
            value={input}
            onChange={(evt) => setInput(evt.target.value)}
          />

          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={search}
            id="searchButton"
          />
        </div>
        {weather.error && (
          <div>
            <FontAwesomeIcon icon={faFrown} />{" "}
            <span style={{ fontSize: "20px" }}>City not found.</span>
          </div>
        )}

        {weather && weather.data && weather.data.main && (
          <div className="content">
            <p id="cityName">
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </p>
            <p id="date"> {date.toDateString()}</p>
            <img
              id="weatherImage"
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            <p id="temperature">{weather.data.main.temp} °C</p>
            <p>Humidity: {weather.data.main.humidity}%</p>
            <p id="weatherResponse">
              {weather.data.weather[0].description.toUpperCase()}
            </p>
            <p id="windSpeed">Wind Speed : {weather.data.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
