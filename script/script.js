const weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
  kyiv: {
    temp: 24,
    humidity: 38,
  },
};

let yourCity = prompt("Enter a city");
yourCity = yourCity.toLowerCase();

if (weather[yourCity] !== undefined) {
  const temperature = weather[yourCity].temp;
  const celsiusTemp = Math.round(temperature);
  const humidity = weather[yourCity].humidity;
  alert(
    `It is currently ${celsiusTemp}°C  in ${yourCity} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${yourCity}`
  );
}
