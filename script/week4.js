const now = new Date();
const currentDay = document.querySelector(".actual-day");
const clock = document.querySelector(".current-time");

let minutes = now.getMinutes();
let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
];
let day = days[now.getDay()];
clock.innerHTML = `Last updated: ${hours}:${minutes}`;
currentDay.innerHTML = `${day}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row next-day">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="col shadow-sm mb-5 bg-body rounded">
            <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="icon of tuesday weather"
              class="next-day-weather"
            />
            <div class="days-weather">
              <span class="next-day-temperature-max">${Math.round(
                forecastDay.temp.max
              )}℃</span>
              <span class="next-day-temperature-min">${Math.round(
                forecastDay.temp.min
              )}℃</span>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let feels = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let pressure = response.data.main.pressure;
  let temperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon-today");
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${temperature} ℃`;
  document.querySelector("#humidity").innerHTML = `${humidity}  %`;
  document.querySelector("#wind").innerHTML = `${wind} km/h`;
  document.querySelector("#pressure").innerHTML = `${pressure} hPa`;
  document.querySelector("#feels").innerHTML = `${feels} ℃`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "6e9697292d87e7ccc444c909587e4383";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "6e9697292d87e7ccc444c909587e4383";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");

// function searchCity(event) {
//     event.preventDefault();
//     const searchInput = document.querySelector("#inputCity");
//     const newCity = document.querySelector(".city-title");
// newCity.innerHTML = `${searchInput.value}`;
// }

// const form = document.querySelector("#search-form");
// form.addEventListener("submit", searchCity);

// function changeFarenheit() {
//     const newUnits = document.querySelector("#temperature");
// newUnits.innerHTML = `+66`;
// }

// const unitsFar = document.querySelector("#farenheit-link");
// unitsFar.addEventListener("click", changeFarenheit);

// function changeCelcius() {
//   const newUnitsCel = document.querySelector("#temperature");
//   newUnitsCel.innerHTML = `+20`;
// }

// const unitsCel = document.querySelector("#celcius-link");
// unitsCel.addEventListener("click", changeCelcius);

// const apiKey = "6e9697292d87e7ccc444c909587e4383";
// const city = "Sydney";
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
