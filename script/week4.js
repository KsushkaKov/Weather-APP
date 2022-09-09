const now = new Date();
const currentDay = document.querySelector(".actual-day");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
];
const day = days[now.getDay()];
currentDay.innerHTML = `${day}`;

const clock = document.querySelector(".current-time");
let minutes = now.getMinutes();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
clock.innerHTML = `Last updated: ${hours}:${minutes}`;

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
}

function searchCity(city) {
  let apiKey = "6e9697292d87e7ccc444c909587e4383";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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
