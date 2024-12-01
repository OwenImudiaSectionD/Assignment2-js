// Weather App Example

// HTML Structure
const appHTML = `
  <div id="app">
    <h1>Weather App</h1>
    <input type="text" id="city" placeholder="Enter city name">
    <button id="getWeather">Get Weather</button>
    <div id="weatherDetails" style="margin-top: 20px;"></div>
  </div>
`;
document.body.innerHTML = appHTML;

document.body.style.cssText = "font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background: #f0f0f0;";

document.querySelector('#app').style.cssText = "border: 1px solid #ccc; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);";

document.querySelector('#getWeather').style.cssText = "padding: 10px 15px; background: #007bff; color: #fff; border: none; border-radius: 4px; cursor: pointer;";

// Classes
class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = "https://api.openweathermap.org/data/2.5/weather";
  }

  async getWeather(city) {
    try {
      const response = await fetch(`${this.baseURL}?q=${city}&appid=${this.apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

class UI {
  static displayWeather(data) {
    const weatherDetails = document.getElementById("weatherDetails");
    weatherDetails.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
    `;
  }

  static showError(error) {
    const weatherDetails = document.getElementById("weatherDetails");
    weatherDetails.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}

// Event Listeners
const weatherService = new WeatherService("adba77d51eb022d4a7aab7a620398524");
const getWeatherButton = document.getElementById("getWeather");
const cityInput = document.getElementById("city");

getWeatherButton.addEventListener("click", async () => {
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await weatherService.getWeather(city);
      UI.displayWeather(weatherData);
    } catch (error) {
      UI.showError(error);
    }
  } else {
    UI.showError(new Error("Please enter a city name"));
  }
});


const defaultCity = { name: "Toronto", country: "Canada" };
localStorage.setItem("defaultCity", JSON.stringify(defaultCity)); 
const savedCity = JSON.parse(localStorage.getItem("defaultCity")); 
console.log(`Saved city: ${savedCity.name}, ${savedCity.country}`);


const extendedCity = { ...defaultCity, population: "2.9M" };
console.log(extendedCity);
