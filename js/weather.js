const weather = document.querySelector(".js-weather"),
  // now = weather.querySelector(".js-weather-now"),
  temp = weather.querySelector(".js-weather-temp"),
  min = weather.querySelector(".js-weather-min"),
  max = weather.querySelector(".js-weather-max"),
  place = weather.querySelector(".js-weather-place");

const API_KEY = "bba018f8bf80d5ed7b6f3c7b915ee70b",
  COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      //데이터가 완전히 넘어온 다음 실행
      return response.json();
    })
    .then(function (json) {
      const tempValue = json.main.temp;
      const minValue = json.main.temp_min;
      const maxValue = json.main.temp_max;
      const placeValue = json.name;
      const description = json.weather[0].description;
      // now.innerText = `${description}`;
      temp.innerText = `${tempValue}℃`;
      min.innerText = `min: ${minValue}℃`;
      max.innerText = `max: ${maxValue}℃`;
      place.innerText = `@${placeValue}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("weather - access denied");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
