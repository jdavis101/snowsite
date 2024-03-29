//remove weather Api and googl api before pushing to  repo
// Main
import {
  //from hidden file 
  weatherApiKey,
  googleApiKey
} from '../.git/secret.js';


var script = document.createElement('script');
//srcipt for google api key in order to encapsulate the sensitive information
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + 
googleApiKey + '&callback=initMap';

window.initMap = function() {
  // JS API is loaded and available
};

script.async = true;
document.head.appendChild(script);
var apiUrl;
var latitude,longitude,long,lata;

getLocation();

console.log("locations list");
var locations = [
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

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  // Make a request to Google Maps API geocoding service
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("api data = " + JSON.stringify(data, null, 2)); 
      // Timeout so that api calls are not constantly pinging for information before responses can be generated
      setTimeout(function(){
      },500);
      // Extract current city, state, and country from API response
      try{
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find(component => component.types.includes("locality")).long_name;
        const state = addressComponents.find(component => component.types.includes("administrative_area_level_1")).long_name;
        const country = addressComponents.find(component => component.types.includes("country")).long_name;
        // Update the first location in the array with the current location information
        locations[0].city = city;
        locations[0].state = state;
        locations[0].country = country;

        //adding to the list possibly 
        // locations.push({city: state, country, ".third-icon": ".third-info"})

        // dynamically updated locations list
        // locations[0].city = "Anadyr";
        // locations[0].state = "Chukotka Autonomous Okrug";
        // locations[0].country = "Russia";

        // Now you can run any code that relies on the updated location information
        console.log(locations);
        loopyloop();
      }
      catch (error){
        console.log(addressComponents)
        console.log("Invalid Google Api Data returned")
      }
      
    })
    .catch(error => console.log(error));
}
function error(error) {
  console.log(error.message);
}
function loopyloop(){
  for (let i = 0; i < locations.length; i++) {
    console.log("locations.foreach()");
    const location = locations[i];
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.city},
    ${location.state},${location.country}&appid=${weatherApiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        //wait time in between api calls
        setTimeout(function(){
        },500);
        const weatherIcon = getWeatherIcon(data.weather[0].main);
        const kelvin = data.main.temp;
        const k2f = (kelvin - 273.15) * (9 / 5) + 32;
        const weatherInfo = k2f.toFixed() + "°F " + location.city;
        // Set the icons for the weather on homepage
        document.querySelector(location.iconSelector).innerHTML = weatherIcon;
        document.querySelector(location.infoSelector).innerHTML = weatherInfo;
      })
      .catch(error => console.error(error)); 
  }
}
 
// make API calls and update UI for each location
function getLocation() {
  console.log("getLocation()");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//  what is this position and where is it coming from?
function showPosition(position) {
  console.log("showposition()" );
  long = position.coords.longitude;
  lata = position.coords.latitude;
}

function getWeatherIcon(weather) {
  console.log("getWeatherIcon()");
  // add weather icons for all weather types
  console.log("The value of the weather is " + weather);
  switch (weather) {
    case 'Clear':
      return '<i class="fas fa-sun"></i>';
    case 'Clouds':
      return '<i class="fas fa-cloud"></i>';
    //Fall through for mist and rain
    case 'Rain':
    case 'Mist':
      return '<i class="fas fa-cloud-rain"></i>';
    case 'Snow':
      return '<i class="fas fa-snowflake"></i>';
    case 'Fog':
      return '<i class="fa-solid fa-smog"></i>';
    default:
      return '<i class="fas fa-question"></i>';
  }
}

function parallax() {
  const header = document.getElementById('header');
  header.style.backgroundPositionY = -window.scrollY * .5 + 'px';
  window.addEventListener('scroll', parallax);
}


