import {
  weatherApiKey,
  googleApiKey
} from './.git/secret.js';



getLocation()
//initMap()
// support@github.com
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
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.city},
  ${location.state},${location.country}&appid=${weatherApiKey}`;
  console.log('openWeatherApi');
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      //wait time in between api calls
      setTimeout(function(){
        console.log('openWeatherEnd');
      },500);
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
  console.log("getlocationmethod");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
   console.log("Latitude: " + position.coords.latitude + 
  "Longitude: " + position.coords.longitude);
  const long = position.coords.longitude;
  const lata = position.coords.latitude;
  getStateFromLatLng(lata, long);
}


//  Somehow get the state form this code below
function getStateFromLatLng(lata, long) {
  // Create a new Geocoder object
  console.log('First google call');
  var geocoder = new google.maps.Geocoder();
  //wait time in between api calls
  setTimeout(function(){
    console.log('First google call end');
  },500);

  // Create a LatLng object from the input coordinates
  console.log('Second google call');
  var latLng = new google.maps.LatLng(lata, long);
  //wait time in between api calls
  setTimeout(function(){
    console.log('Second google call end');
  },500);

  // Call the geocode() method to get information about the location
  // retrieves the user city, state, country
  geocoder.geocode({ 'latLng': latLng }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // Loop through the results to find the state
      var address = {};
      for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < results[i].address_components.length; j++) {
          var component = results[i].address_components[j];
          if (component.types.indexOf('locality') != -1) {
            address.city = component.long_name;
          }
          if (component.types.indexOf('administrative_area_level_1') != -1) {
            address.state = component.long_name;
          }
          if (component.types.indexOf('country') != -1) {
            address.country = component.long_name;
          }
        }
      }
      console.log(address);
      //return address;
    } else {
      console.log('Geocode failed: ' + status);
    }
  });
}
