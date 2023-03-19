import {
  ghost
} from './.git/secret.js'

//App Ski Mountain
let city = "Boone";
let state = "NorthCarolina";
let country = "US";
callApi(city, state, country);

//Catalooche Mountain
let city2 = "Novosibirsk";
let state2 = "Novosibirsk Oblast";
let country2 = "Russia";
callApi(city2, state2, country2);

function callApi(city, state, country){
  weatherLogic("https://api.openweathermap.org/data/2.5/weather?q=" 
  + city 
  + ","
  + state
  + ","
  + country
  + "&appid=" 
  + ghost);
}

function weatherLogic(apiUrl){
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    
  //This will probably need a loop to have all three places

    const firstWeather = getWeatherIcon(data.weather[0].main);
    //returns in kelvin
    const kelvin = data.main.temp;
    //Kelvin to Farenheit conversion
    const k2f = (kelvin-273.15)* (9/5) + 32;
    //prints the weather in F
    const firstInfo = k2f.toFixed()+ "°F " + city;

    // cataloochee
    const secondWeather = getWeatherIcon(data.weather[0].main);
    //returns in kelvin
    const kelvin2 = data.main.temp;
    //Kelvin to Farenheit conversion
    const k2f2 = (kelvin2-273.15)* (9/5) + 32;
    //prints the weather in F
    const secondInfo = k2f2.toFixed()+ "°F " + city2;


    document.querySelector('.first-icon').innerHTML = firstWeather;
    document.querySelector('.first-info').innerHTML = firstInfo;
    document.querySelector('.second-icon').innerHTML = secondWeather;
    document.querySelector('.second-info').innerHTML = secondInfo;
  })
  .catch(error => console.error(error));
}





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
    default:
      return '<i class="fas fa-question"></i>';
  }
}
