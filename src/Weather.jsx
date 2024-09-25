import React, { useState } from "react";
import axios from "axios";
import styles from "./weather.module.css";

const API_KEY = "0498080e1a5197f270b0caf571365be5";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (location === "") {
      alert("fields empty");
    } else {
      if (!location) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: location,
            appid: API_KEY,
            units: "metric",
          },
        });
        setWeather(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            className={styles.input}
          />
          <button
            onClick={fetchWeather}
            className={styles.searchButton}
            disabled={loading}
          >
            Search
          </button>
        </div>

        {loading && <p className={styles.message}>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {weather && (
          <div className={styles.weatherInfo}>
            <div className={styles.locationInfo}>
              <h2 className={styles.cityName}>{weather.name}</h2>
              <p className={styles.country}>{weather.sys.country}</p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className={styles.weatherIcon}
            />
            <div className={styles.temperatureContainer}>
              <span className={styles.temperature}>
                {Math.round(weather.main.temp)}°C
              </span>
              <div className={styles.weatherDescription}>
                <p>{weather.weather[0].main}</p>
                <p>{weather.weather[0].description}</p>
              </div>
            </div>
            <div className={styles.additionalInfo}>
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>Wind Speed</p>
                <p className={styles.infoValue}>{weather.wind.speed} m/s</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.infoLabel}>Coordinates</p>
                <p className={styles.infoValue}>
                  {weather.coord.lat.toFixed(2)}, {weather.coord.lon.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
