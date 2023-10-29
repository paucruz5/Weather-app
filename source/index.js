//current time, date, weather and location

function formatTime(date) {
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentHours}:${currentMinutes}`;
}

function formatDate(date) {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[now.getMonth()];

  let currentDate = now.getDate();
  let currentYear = now.getFullYear();

  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
}

function showCity(response) {
  let myCity = document.querySelector("#city");
  let myTempData = document.querySelector("#temp");
  let myHumidityData = document.querySelector(".humidity");
  let myWindData = document.querySelector(".wind");
  let myDescriptionData = document.querySelector(".description");
  let iconData = document.querySelector("#icon");
  let currentHora = document.querySelector("#tiempo");
  let currentFecha = document.querySelector("#date");

  celsiusTemp = response.data.temperature.current;

  let myTemperature = Math.round(celsiusTemp);
  let myWindSpeed = Math.round(response.data.wind.speed);
  let myDescription = response.data.condition.description;
  let currentTime = new Date();

  myCity.innerHTML = `In ${response.data.city} `;
  myTempData.innerHTML = `is ${myTemperature}°C`;
  myHumidityData.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  myWindData.innerHTML = `Wind: ${myWindSpeed}km/h`;
  myDescriptionData.innerHTML = `If you go outside you're going to see a ${myDescription}`;
  iconData.setAttribute("src", `${response.data.condition.icon_url}`);
  iconData.setAttribute("alt", response.data.condition.description);
  currentHora.innerHTML = `⌚ ${formatTime(currentTime)}`;
  currentFecha.innerHTML = `${formatDate()}`;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "8ct2716ea6f8a04o8535eed14cbdd63a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCity);
}

// my location and weather

function myPosition(position) {
  let apiKey2 = "8ct2716ea6f8a04o8535eed14cbdd63a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl2 = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey2}&units=metric`;

  axios.get(apiUrl2).then(showCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myPosition);
}

let locationButton = document.querySelector("#my-location");
locationButton.addEventListener("click", getCurrentLocation);

//Specific city's weather

function showData(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#question");

  searchCity(inputCity.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showData);

// Fahrenheit to Celsius

let celsiusTemp = null;

function changeToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempSelector = document.querySelector("#temp");
  let fahrConversion = (celsiusTemp * 9) / 5 + 32;
  tempSelector.innerHTML = `is ${Math.round(fahrConversion)}°F `;
}

let fahrenheitLink = document.querySelector("#fahr");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

// Celsius to Fahrenheit

function changeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempSelector = document.querySelector("#temp");
  tempSelector.innerHTML = `is ${Math.round(celsiusTemp)}°C`;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);

searchCity("Tizimin");

// creating the days

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#forecastDays");

  let forecastDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let forecastHTML = `<div class="row">`;
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <p class="emoticon">☀️</p>
            <div class="weekDays"
              >${day}
              <br />
              <span class="forecast" id="mon-temp">
                <span id="maxtemp">0°C</span>
                <span id="mintemp">0°C</span>
              </span>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

// creating API call for forescast

function getForecast(coordinates) {
  let apiKey3 = "8ct2716ea6f8a04o8535eed14cbdd63a";
  let apiUrl3 = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey3}&units=metric`;
  axios.get(apiUrl3).then(displayForecast);
}
