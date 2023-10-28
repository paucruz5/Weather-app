//current location, time, date and weather

function showCity(response) {
  let myTemperature = Math.round(response.data.temperature.current);
  let myHumidity = response.data.temperature.humidity;
  let myWindSpeed = Math.round(response.data.wind.speed);
  let myDescription = response.data.condition.description;

  let myCity = document.querySelector("#city");
  let myTempData = document.querySelector("#temp");
  let myHumidityData = document.querySelector(".humidity");
  let myWindData = document.querySelector(".wind");
  let myDescriptionData = document.querySelector(".description");
  let iconData = document.querySelector("#icon");

  myCity.innerHTML = `You are in ${response.data.city}`;
  myTempData.innerHTML = `and is ${myTemperature}°C here`;
  myHumidityData.innerHTML = `Humidity: ${myHumidity}%`;
  myWindData.innerHTML = `Wind: ${myWindSpeed}km/h`;
  myDescriptionData.innerHTML = `If you go outside you're going to see a ${myDescription}`;
  iconData.setAttribute("src", `${response.data.condition.icon_url}`);
  iconData.setAttribute("alt", response.data.condition.description);

  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursay",
    "Friday",
    "Saturday",
    "Sunday",
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

  let currentFecha = document.querySelector("#date");
  currentFecha.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  let currentHora = document.querySelector("#tiempo");
  let currentTime = new Date();
  currentHora.innerHTML = `⌚ ${formatDate(currentTime)}`;

  console.log(response);
}

function formatDate(date) {
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

function myPosition(position) {
  let apiKey = "8ct2716ea6f8a04o8535eed14cbdd63a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(url).then(showCity);
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
  let inputCity = document.querySelector("#question").value;
  inputCity = inputCity.toLowerCase();
  inputCity = inputCity.trim();

  let apiKey3 = "8ct2716ea6f8a04o8535eed14cbdd63a";
  let url3 = `https://api.shecodes.io/weather/v1/current?query=${inputCity}&key=${apiKey3}&units=metric`;

  axios.get(url3).then(weatherData);
}

function weatherData(response) {
  let ciudad = response.data.city;
  let grados = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.condition.description;

  let ciudadName = document.querySelector("#city");
  let gradosData = document.querySelector("#temp");
  let humidityData = document.querySelector(".humidity");
  let windData = document.querySelector(".wind");
  let descriptionData = document.querySelector(".description");
  let iconData = document.querySelector("#icon");

  ciudadName.innerHTML = `The weather in ${ciudad}`;
  gradosData.innerHTML = `is ${grados}°C`;
  humidityData.innerHTML = `Humidity: ${humidity}%`;
  windData.innerHTML = `Wind: ${windSpeed}km/h`;
  descriptionData.innerHTML = `If you go outside you're going to see a ${description}`;
  iconData.setAttribute("src", `${response.data.condition.icon_url}`);
  iconData.setAttribute("alt", response.data.condition.description);

  console.log(response);
}

function searchCity(city) {
  let apiKey2 = "8ct2716ea6f8a04o8535eed14cbdd63a";
  let apiUrl2 = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey2}&units=metric`;
  axios.get(apiUrl2).then(weatherData);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showData);

searchCity("Ciudad de Mexico");
