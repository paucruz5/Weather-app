//current location, time, date and weather

function showCity(response) {
  let myTemperature = Math.round(response.data.main.temp);
  let myHumidity = response.data.main.humidity;
  let myWindSpeed = Math.round(response.data.wind.speed);
  let myDescription = response.data.weather[0].description;

  let myCity = document.querySelector("#city");
  let myTempData = document.querySelector("#temp");
  let myHumidityData = document.querySelector(".humidity");
  let myWindData = document.querySelector(".wind");
  let myDescriptionData = document.querySelector(".description");

  myCity.innerHTML = `You are in ${response.data.name}`;
  myTempData.innerHTML = `and is ${myTemperature}°C here`;
  myHumidityData.innerHTML = `Humidity: ${myHumidity}%`;
  myWindData.innerHTML = `Wind: ${myWindSpeed}km/h`;
  myDescriptionData.innerHTML = `If you go outside you're going to see a ${myDescription}`;

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
  let apiKey = "2180315df5a397d94819d287230401b3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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

  let apiKey3 = "2180315df5a397d94819d287230401b3";
  let url3 = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey3}&units=metric`;

  axios.get(url3).then(weatherData);
}

function weatherData(response) {
  let ciudad = response.data.name;
  let grados = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;

  let ciudadName = document.querySelector("#city");
  let gradosData = document.querySelector("#temp");
  let humidityData = document.querySelector(".humidity");
  let windData = document.querySelector(".wind");
  let descriptionData = document.querySelector(".description");

  ciudadName.innerHTML = `The weather in ${ciudad}`;
  gradosData.innerHTML = `is ${grados}°C`;
  humidityData.innerHTML = `Humidity: ${humidity}%`;
  windData.innerHTML = `Wind: ${windSpeed}km/h`;
  descriptionData.innerHTML = `If you go outside you're going to see a ${description}`;

  console.log(response);
}

function searchCity(city) {
  let apiKey2 = "2180315df5a397d94819d287230401b3";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey2}&units=metric`;
  axios.get(apiUrl2).then(weatherData);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showData);

searchCity("Ciudad de Mexico");
