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

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentDay = days[currentDate.getDay()];
let currentMonth = months[currentDate.getMonth()];
let currentNumeralDate = currentDate.getDate();
let currentYear = currentDate.getFullYear();
h2.innerHTML = `${currentDay} ${currentNumeralDate} ${currentMonth}  ${currentYear}`;

//feature 2 (display search with real-time data)
function getForecast(coordinates) {
  let apiKey = "b3cdc73b2c038da1d3ef502745783d38";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  let country = response.data.sys.country;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed) + ` mph`;

  let iconElementOne = document.querySelector("#current-weather-icon-1");
  iconElementOne.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let iconElementTwo = document.querySelector("#current-weather-icon-2");
  iconElementTwo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector("#country-name").innerHTML = `(${country})`;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-weather-conditions").innerHTML =
    response.data.weather[0].main;

  getForecast(response.data.coord);
}

function displaySearch(event) {
  event.preventDefault();
  let apiKey = "b3cdc73b2c038da1d3ef502745783d38";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", displaySearch);

//feature 3 (change temperature units) - currently removed temporarily
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

//feature 4 (the 6 day forecast)

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="card-body"><div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-5">
        <div class="days">
          ${formatDay(forecastDay.dt)}
        </div>
      </div>
      <div class="col-3 weather-icons">
        <img
          class="partly-cloudy-day-icon"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="80"
        />
      </div>
      <div class="col-4 temperature high-temp">
        <strong> ${Math.round(forecastDay.temp.max)}°</strong>
         <span class="low-temp">/ ${Math.round(forecastDay.temp.min)}°</span>
      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div></div>`;
  forecastElement.innerHTML = forecastHTML;
}
