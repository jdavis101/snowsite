import {
  weatherApiKey,
  googleApiKey
} from './.git/secret.js';

getLocation()



//For loop for locations 
const locations = [
  {
    city: "Boone",
    state: "North Carolina",
    country: "US",
    iconSelector: ".first-icon",
    infoSelector: ".first-info"
  },
  {
    city: "Novosibirsk",
    state: "Novosibirsk Oblast",
    country: "Russia",
    iconSelector: ".second-icon",
    infoSelector: ".second-info"
  },
  {
    city: "Seoul",
    state: "Seoul",
    country: "SouthKorea",
    iconSelector: ".third-icon",
    infoSelector: ".third-info"
  }
];

// make API calls and update UI for each location
locations.forEach(location => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.state},${location.country}&appid=${weatherApiKey}`;
  console.log(apiUrl);
  console.log('before');
  setTimeout(function(){
    console.log('after');
  },500);
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherIcon = getWeatherIcon(data.weather[0].main);
      const kelvin = data.main.temp;
      const k2f = (kelvin - 273.15) * (9 / 5) + 32;
      const weatherInfo = k2f.toFixed() + "°F " + location.city;
      document.querySelector(location.iconSelector).innerHTML = weatherIcon;
      document.querySelector(location.infoSelector).innerHTML = weatherInfo;
    })
    .catch(error => console.error(error));
});

function getWeatherIcon(weather) {
  switch (weather) {
    case 'Clear':
      return '<i class="fas fa-sun"></i>';
    case 'Clouds':
      return '<i class="fas fa-cloud"></i>';
    case 'Rain':
      return '<i class="fas fa-cloud-rain"></i>';
    case 'Snow':
      return '<i class="fas fa-snowflake"></i>';
    case 'Haze':
    case 'Fog':
      return '<i class="fa-solid fa-smog"></i>';
    default:
      return '<i class="fas fa-question"></i>';
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
   console.log("Latitude: " + position.coords.latitude + 
  "Longitude: " + position.coords.longitude);
}