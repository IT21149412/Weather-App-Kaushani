import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/cities.json');
        const cityCodes = response.data.List.map(city => city.CityCode);

        const apiKey = 'c87c9ea6fc5343c1ea998a0eb1668fa8'; 
        const baseUrl = 'http://api.openweathermap.org/data/2.5/group';

        const params = {
          id: cityCodes.join(','),
          units: 'metric',
          appid: apiKey,
        };

        const weatherResponse = await axios.get(baseUrl, { params });
        setWeatherData(weatherResponse.data.list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Weather Information</h1>
      <div className="weather-container">
        {weatherData.map(city => (
          <div key={city.id} className="weather-tile">
            <h2>{city.name}</h2>
            <p>Temperature: {city.main.temp} °C</p>
            <p>Weather: {city.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
