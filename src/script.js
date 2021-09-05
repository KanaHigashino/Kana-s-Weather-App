//feature 1 (current date)
let h2 = document.querySelector("#current-date");
let currentDate = new Date();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let currentDay = days[currentDate.getDay()];
let currentMonth = months[currentDate.getMonth()];
let currentNumeralDate = currentDate.getDate();
let currentYear = currentDate.getFullYear();

h2.innerHTML = `${currentDay} ${currentNumeralDate} ${currentMonth}  ${currentYear}`;

//feature 2 (display search with real-time data)
function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  console.log(response);
  let country = response.data.sys.country;
  document.querySelector("#country-name").innerHTML = `(${country})`;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-weather-conditions").innerHTML =
    response.data.weather[0].main;
}

function displaySearch(event) {
  event.preventDefault();
  let apiKey = "b3cdc73b2c038da1d3ef502745783d38";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", displaySearch);

//bonus feature (change temperature units)
function convertTemperatureUnit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let currentTemperature = temperatureElement.innerHTML;
  currentTemperature = Number(currentTemperature);
  let celciusFahrenheitDisplay = document.querySelector(
    "#celcius-fahrenheit-display"
  );

  if (celciusFahrenheitLink.innerHTML === "°C") {
    temperatureElement.innerHTML = Math.round(
      (currentTemperature * 9) / 5 + 32
    );
    celciusFahrenheitLink.innerHTML = "°F";
  } else {
    celciusFahrenheitLink.innerHTML = "°C";
    temperatureElement.innerHTML = Math.round(
      ((currentTemperature - 32) * 5) / 9
    );
  }
}

function searchLocation(position) {
  let apiKey = "b3cdc73b2c038da1d3ef502745783d38";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celciusFahrenheitLink = document.querySelector("#celcius-fahrenheit");
celciusFahrenheitLink.addEventListener("click", convertTemperatureUnit);

let currentLocationButton = document.querySelector("#search-current-location");
currentLocationButton.addEventListener("click", displayCurrentLocationWeather);
