import {
  weatherApiKey,
  googleApiKey
} from './.git/secret.js';

var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + googleApiKey + '&callback=getStateFromLatLng';
script.async = true;
document.head.appendChild(script);



var cty, state, country, pos;

var locations = [];

getLocation();
displayWeather();
//showPosition(position);




// make API calls and update UI for each location
function displayWeather(){
console.log("displayWeather");
locations = [
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
  locations.forEach(location => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.city},
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
        document.querySelector(location.iconSelector).innerHTML = weatherIcon;
        document.querySelector(location.infoSelector).innerHTML = weatherInfo;
      })
      .catch(error => console.error(error));
  });
}

function getWeatherIcon(weather) {
  console.log("getting weather icon");
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
  console.log("getLocation ran");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    //console.log(navigator.geolocation.getCurrentPosition(showPosition))
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//  what is this position and where is it coming from?
function showPosition(position) {
  console.log("showposition function");
  // console.log("Latitude: " + position.coords.latitude + 
  // "\nLongitude: " + position.coords.longitude);
  const long = position.coords.longitude;
  const lata = position.coords.latitude;
  getLocationFromLatLng(lata, long);
}

//  Somehow get the state form this code below
function getLocationFromLatLng(lata, long) {
  console.log("get locationfromLL function");
  // Create a new Geocoder object
  var geocoder = new google.maps.Geocoder();
  //wait time in between api calls
  setTimeout(function(){
  },500);

  // Create a LatLng object from the input coordinates
  var latLng = new google.maps.LatLng(lata, long);
  //wait time in between api calls
  setTimeout(function(){
  },500);
  console.log("The city is " + locations[0].city);

  console.log(locations[0].city);
  // Call the geocode() method to get information about the location
  // retrieves the user city, state, country
  geocoder.geocode({ 'latLng': latLng }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // Loop through the results to find the state
      var address = {};
      console.log("calling loops");
      for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < results[i].address_components.length; j++) {
          var component = results[i].address_components[j];
          if (component.types.indexOf('locality') != -1) {
            address.city = component.long_name;
             cty = address.city;
          }
          if (component.types.indexOf('administrative_area_level_1') != -1) {
            address.state = component.long_name;
            state = address.state;
          }
          if (component.types.indexOf('country') != -1) {
            address.country = component.long_name;
            country = address.country;
          }
        }
      }
      //how do I set this city in the location list??
      // console.log(locations[0].city);
      // console.log(locations[0].state);
      // console.log(locations[0].country);

      locations[0].city = "Schwenksville";
      locations[0].state = "PA";
      locations[0].country = "US";
      
      console.log("The city is " + locations[0].city);

      console.log(cty);
      console.log(address);
      //return address;
    } else {
      console.log('Geocode failed: ' + status);
    }
  });


}

