function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row next-day">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col shadow-sm p-3 mb-5 bg-body rounded">
            <div class="forecast-day">${day}</div>
            <img
              src="images/tue_weather.png"
              alt="icon of tuesday weather"
              class="next-day-weather"
            />
            <div class="days-weather">
              <span class="next-day-temperature">+24 ℃</span>
            </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
