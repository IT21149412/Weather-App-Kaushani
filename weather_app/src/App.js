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
        {weatherData.map(city => {
          const weatherStatus = city.weather[0].main.toLowerCase(); // Get the main weather status
          const weatherIcon = city.weather[0].icon; // Get the weather icon code

          // Define background colors based on main weather status
          let overlayColor;
          switch (weatherStatus) {
            case 'thunderstorm':
              overlayColor = 'rgba(160, 160, 160, 0.5)'; // Light gray overlay for Thunderstorm
              break;
            case 'drizzle':
              overlayColor = 'rgba(165, 214, 218, 0.5)'; // Light teal overlay for Drizzle
              break;
            case 'rain':
              overlayColor = 'rgba(134, 203, 139, 0.5)'; // Light green overlay for Rain
              break;
            case 'snow':
              overlayColor = 'rgba(224, 224, 224, 0.5)'; // Light gray overlay for Snow
              break;
            case 'mist':
            case 'smoke':
            case 'haze':
            case 'dust':
            case 'fog':
            case 'sand':
            case 'ash':
              overlayColor = 'rgba(209, 218, 219, 0.5)'; // Light gray overlay for various conditions
              break;
            case 'squall':
            case 'tornado':
              overlayColor = 'rgba(98, 125, 140, 0.5)'; // Light blue gray overlay for Squall and Tornado
              break;
            case 'clear':
              overlayColor = 'rgba(255, 176, 96, 0.5)'; // Light orange overlay for Clear
              break;
            case 'clouds':
              overlayColor = 'rgba(139, 158, 172, 0.5)'; // Light blue gray overlay for Clouds
              break;
            default:
              overlayColor = 'rgba(255, 255, 255, 0.5)'; // Default overlay color
          }

          const tileStyle = {
            background: `url('https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative', // Set position to make overlay work
          };

          const overlayStyle = {
            backgroundColor: overlayColor,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '12px',
          };


          return (
            <div
              key={city.id}
              className="weather-tile"
              style={tileStyle} // Apply inline style
            >
              <div style={overlayStyle}></div>
              <div className="tile-content">
                <h2>{city.name}</h2>
                <img
                  src={`http://openweathermap.org/img/w/${weatherIcon}.png`} // Icon URL
                  alt="Weather Icon"
                />
                <p>Temperature: {city.main.temp} °C</p>
                <p>Weather: {city.weather[0].description}</p>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
