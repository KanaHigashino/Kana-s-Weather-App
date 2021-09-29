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

//the forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="card-body"><div class="row">`;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-5 days">Tuesday</div>
      <div class="col-3 weather-icons">
        <img
          class="partly-cloudy-day-icon"
          src="https://img.icons8.com/color/40/000000/partly-cloudy-day--v1.png"
        />
        </div>
        <div class="col-4 temperature">
          <strong> 21° </strong>
          / 11°
        </div>
  `;
  forecastHTML =
    forecastHTML +
    `
        <div class="col-5 days">Wednesday</div>
        <div class="col-3 weather-icons">
          <img
          class="partly-cloudy-day-icon"
          src="https://img.icons8.com/color/40/000000/partly-cloudy-day--v1.png"
          />
          </div>
          <div class="col-4 temperature">
            <strong> 21° </strong>
            / 12°
          </div>
  `;
  forecastHTML =
    forecastHTML +
    `
          <div class="col-5 days">Thursday</div>
          <div class="col-3 weather-icons">
            <svg
            class="windy-icon"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="35"
            height="35"
            viewBox="0 0 226 226"
            style="fill: #000000"
            >
              <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
              >
                <path d="M0,226v-226h226v226z" fill="none"></path>
                <g fill="#47b8ff">
                  <path
                  d="M65.54,18.08c-13.653,0 -25.72726,7.21261 -32.51398,18.00055c-1.75119,2.73529 -1.90063,6.19973 -0.39149,9.07566c1.50914,2.87593 4.44494,4.72139 7.69081,4.83448c3.24587,0.11309 6.303,-1.52356 8.00864,-4.28748c3.60928,-5.73718 9.88622,-9.5432 17.20602,-9.5432c11.52198,0 20.629,9.26239 20.33117,20.88734c-0.2831,10.9978 -10.17434,19.79266 -21.6907,19.79266h-41.58047c-3.26015,-0.04611 -6.29258,1.66675 -7.93611,4.48269c-1.64353,2.81594 -1.64353,6.29868 0,9.11462c1.64353,2.81594 4.67596,4.5288 7.93611,4.48269h41.58047c20.80164,0 39.22212,-16.10244 39.7707,-37.41359c0.55193,-21.5428 -16.96427,-39.42641 -38.41117,-39.42641zM167.24,31.64c-16.95854,0 -31.84358,9.41393 -39.55,23.32391c-2.42075,4.36857 -0.84174,9.87241 3.52684,12.29316c4.36857,2.42075 9.87241,0.84174 12.29316,-3.52684c4.62414,-8.3465 13.44198,-14.01023 23.73,-14.01023c15.64414,0 28.02438,12.87781 27.06703,28.80617c-0.86137,14.33164 -13.66535,25.43383 -28.47953,25.43383h-143.2275c-3.26015,-0.04611 -6.29258,1.66675 -7.93611,4.48269c-1.64353,2.81594 -1.64353,6.29868 0,9.11462c1.64353,2.81594 4.67596,4.5288 7.93611,4.48269h143.2275c23.90414,0 45.06231,-18.10457 46.52422,-42.42797c1.56481,-26.03532 -19.33458,-47.97203 -45.11172,-47.97203zM22.6,131.08c-3.26015,-0.04611 -6.29258,1.66675 -7.93611,4.48269c-1.64353,2.81594 -1.64353,6.29868 0,9.11462c1.64353,2.81594 4.67596,4.5288 7.93611,4.48269h86.78047c11.51636,0 21.4076,8.79485 21.6907,19.79266c0.29783,11.62496 -8.80919,20.88734 -20.33117,20.88734c-7.3198,0 -13.59673,-3.80602 -17.20602,-9.5432c-1.70563,-2.76396 -4.76276,-4.40065 -8.00866,-4.28757c-3.2459,0.11308 -6.18172,1.95855 -7.69087,4.83451c-1.50914,2.87596 -1.35967,6.34042 0.39156,9.07571c6.78672,10.78793 18.86098,18.00055 32.51398,18.00055c21.4469,0 38.9631,-17.8836 38.41117,-39.42641c-0.54858,-21.31116 -18.96906,-37.41359 -39.7707,-37.41359z"
                  ></path>
                </g>
              </g>
            </svg>
            <span class="wind-stats"> 8mph </span>
          </div>
          <div class="col-4 temperature">
            <strong> 19° </strong>
            / 15°
          </div>
  `;
  forecastHTML =
    forecastHTML +
    `
          <div class="col-5 days">Friday</div>
          <div class="col-3 weather-icons">
            <svg
              class="cloudy-icon"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 172 172"
              style="fill: #000000"
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#95a5a6">
                  <path
                    d="M105.70833,43c-16.82167,0 -30.45833,13.63666 -30.45833,30.45833c0,16.82167 13.63666,30.45833 30.45833,30.45833c16.82167,0 30.45833,-13.63666 30.45833,-30.45833c0,-16.82167 -13.63666,-30.45833 -30.45833,-30.45833z"
                  ></path>
                  <path
                    d="M132.58333,78.44992c-13.85314,0 -25.08333,11.23019 -25.08333,25.08333c0,13.85314 11.23019,25.08333 25.08333,25.08333c13.85314,0 25.08333,-11.23019 25.08333,-25.08333c0,-13.85314 -11.23019,-25.08333 -25.08333,-25.08333zM39.41667,78.83333c-13.85314,0 -25.08333,11.23019 -25.08333,25.08333c0,13.85314 11.23019,25.08333 25.08333,25.08333c13.85314,0 25.08333,-11.23019 25.08333,-25.08333c0,-13.85314 -11.23019,-25.08333 -25.08333,-25.08333z"
                  ></path>
                  <path
                    d="M62.70833,53.75c-12.86363,0 -23.29167,10.42803 -23.29167,23.29167c0,12.86363 10.42803,23.29167 23.29167,23.29167c12.86363,0 23.29167,-10.42803 23.29167,-23.29167c0,-12.86363 -10.42803,-23.29167 -23.29167,-23.29167z"
                    ></path>
                  <path
                    d="M89.58333,71.28325c-13.85314,0 -25.08333,11.23019 -25.08333,25.08333c0,13.85314 11.23019,25.08333 25.08333,25.08333c13.85314,0 25.08333,-11.23019 25.08333,-25.08333c0,-13.85314 -11.23019,-25.08333 -25.08333,-25.08333z"
                    ></path>
                  <path
                    d="M25.08333,114.66667c0,7.91558 6.41775,14.33333 14.33333,14.33333h89.58333c7.91558,0 14.33333,-6.41775 14.33333,-14.33333v-3.58333c0,-7.91558 -6.41775,-14.33333 -14.33333,-14.33333h-89.58333c-7.91558,0 -14.33333,6.41775 -14.33333,14.33333z"
                    ></path>
                </g>
              </g>
            </svg>
          </div>
          <div class="col-4 temperature">
            <strong> 20° </strong>
            / 13°
          </div>
  `;
  forecastHTML =
    forecastHTML +
    `
          <div class="col-5 days">Saturday</div>
          <div class="col-3 weather-icons">
            <svg
              class="cloudy-icon"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 172 172"
              style="fill: #000000"
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g>
                  <path
                    d="M105.70833,17.91667c-16.82167,0 -30.45833,13.63666 -30.45833,30.45833c0,16.82167 13.63666,30.45833 30.45833,30.45833c16.82167,0 30.45833,-13.63666 30.45833,-30.45833c0,-16.82167 -13.63666,-30.45833 -30.45833,-30.45833z"
                    fill="#95a5a6"
                  ></path>
                  <path
                    d="M132.58333,53.36658c-13.85314,0 -25.08333,11.23019 -25.08333,25.08333c0,13.85314 11.23019,25.08333 25.08333,25.08333c13.85314,0 25.08333,-11.23019 25.08333,-25.08333c0,-13.85314 -11.23019,-25.08333 -25.08333,-25.08333zM39.41667,53.75c-13.85314,0 -25.08333,11.23019 -25.08333,25.08333c0,13.85314 11.23019,25.08333 25.08333,25.08333c13.85314,0 25.08333,-11.23019 25.08333,-25.08333c0,-13.85314 -11.23019,-25.08333 -25.08333,-25.08333z"
                    fill="#95a5a6"
                  ></path>
                  <path
                    d="M62.70833,28.66667c-12.86363,0 -23.29167,10.42803 -23.29167,23.29167c0,12.86363 10.42803,23.29167 23.29167,23.29167c12.86363,0 23.29167,-10.42803 23.29167,-23.29167c0,-12.86363 -10.42803,-23.29167 -23.29167,-23.29167z"
                    fill="#95a5a6"
                  ></path>
                  <path
                    d="M89.58333,46.19992c-13.85314,0 -25.08333,11.23019 -25.08333,25.08333c0,13.85314 11.23019,25.08333 25.08333,25.08333c13.85314,0 25.08333,-11.23019 25.08333,-25.08333c0,-13.85314 -11.23019,-25.08333 -25.08333,-25.08333z"
                    fill="#95a5a6"
                  ></path>
                  <path
                    d="M25.08333,89.58333c0,7.91558 6.41775,14.33333 14.33333,14.33333h89.58333c7.91558,0 14.33333,-6.41775 14.33333,-14.33333v-3.58333c0,-7.91558 -6.41775,-14.33333 -14.33333,-14.33333h-89.58333c-7.91558,0 -14.33333,6.41775 -14.33333,14.33333z"
                    fill="#95a5a6"
                  ></path>
                  <g fill="#52baff">
                    <path
                      d="M125.2375,133.12083c-4.05633,4.05992 -10.63533,4.05992 -14.69525,0c-4.0635,-4.05275 -4.05992,-10.63892 0,-14.69167c4.05992,-4.05992 22.04108,-7.34583 22.04108,-7.34583c0,0 -3.2895,17.98833 -7.34583,22.0375zM85.82083,147.45417c-4.05633,4.05633 -10.63533,4.05633 -14.69525,0c-4.05992,-4.05992 -4.05633,-10.63892 0,-14.69525c4.05992,-4.05992 22.04467,-7.34583 22.04467,-7.34583c0,0 -3.29308,17.99192 -7.34942,22.04108zM49.9875,133.12083c-4.05633,4.05992 -10.63533,4.05992 -14.69525,0c-4.05992,-4.05275 -4.05633,-10.63892 0,-14.69167c4.05633,-4.05992 22.04108,-7.34583 22.04108,-7.34583c0,0 -3.2895,17.98833 -7.34583,22.0375z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="col-4 temperature">
            <strong> 22° </strong>
            / 14°
          </div>
  `;
  forecastHTML =
    forecastHTML +
    `
          <div class="col-5 days">Sunday</div>
          <div class="col-3 weather-icons">
            <img
              class="sunny-icon"
              src="https://img.icons8.com/color/40/000000/sun--v1.png"
            />
          </div>
          <div class="col-4 temperature">
            <strong> 23° </strong>
            / 12°
          </div>
        </div>
  `;
  forecastHTML = `</div></div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
