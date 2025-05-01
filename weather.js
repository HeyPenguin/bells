// Replace with your Weatherstack API key
const WEATHERSTACK_API_KEY = "1b5049892986509bdea64414c486cdc9"; // Get your API key from https://weatherstack.com/
const LOCATION = "1905 Armacost Ave, Los Angeles, CA 90025"; // Replace with your location (e.g., city name or zip code)

// Function to fetch weather data
function fetchWeather() {
  const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${encodeURIComponent(LOCATION)}`;

  fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
      if (data && data.current) {
        displayWeather(data);
      } else {
        console.error("Failed to fetch weather data:", data.error.info);
      }
    })
    .catch(err => console.error("Error fetching weather data:", err));
}

// Function to display weather data
function displayWeather(data) {
  const temperature = data.current.temperature; // Temperature in °C
  const weatherDescription = data.current.weather_descriptions[0]; // Weather description
  const weatherIcon = data.current.weather_icons[0]; // Weather icon

  // Assuming you have a div with id "weather-container" in your HTML
  const weatherContainer = document.getElementById("weather-container");
  weatherContainer.innerHTML = `
    <p><img src="${weatherIcon}" alt="Weather Icon" style="vertical-align: middle;"> ${weatherDescription}</p>
    <p>Temperature: ${temperature}°C</p>
  `;
}

// Call fetchWeather every 10 minutes to update weather data
fetchWeather();
setInterval(fetchWeather, 10 * 60 * 1000); // Refresh every 10 minutes
