import { useEffect, useState } from "react";
import img from "./assets/weather-svgrepo-com.svg";

import "./App.css";

function App() {
  const [city, setCity] = useState("patna");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "8cfff37a35a38f4c2f527222d73a235a";
  const formatTime = (real) => {
    return new Date(real * 1000).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchWeather = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        setError("city does not availabel 😒");
        setWeather(null);
        return;
      }

      setError(null);
      setWeather({
        name: data.name,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        sunrise: formatTime(data.sys.sunrise),
        sunset: formatTime(data.sys.sunset),
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const handleInput = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      <div className="main">
        <div className="box">
          <form onSubmit={handleForm}>
            <div className="searchbox">
              <input
                type="text"
                placeholder="Enter city name"
                onChange={handleInput}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          {error && <p className="error">{error}</p>}

          {weather && (
            <div className="userdata">
              <div className="details">
                <p className="city">City: {weather.name}</p>
                <p className="temp">Temperature: {weather.temp}°C</p>
                <p className="temp">Feels Like: {weather.feelsLike}°C</p>
                <p className="temp">Condition: {weather.condition}</p>
                <p className="temp">Humidity: {weather.humidity}%</p>
                <p className="temp">Wind: {weather.wind} m/s</p>
              </div>
              <div className="imgbox">
                <img className="img" src={img} alt="weather icon" />
              </div>
            </div>
          )}
          {weather && (
            <div className="sundetail">
              <p>Sunrise: {weather.sunrise}</p>
              <p>Sunset: {weather.sunset}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
