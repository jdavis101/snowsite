import {
  ghost
} from './.git/secret.js'
//App Ski Mountain
let city = "Boone";
let state = "NorthCarolina";
let country = "US";
//key = ghost;


//Catalooche Mountain
callApi();

function callApi(){
  weatherLogic("https://api.openweathermap.org/data/2.5/weather?q=" 
  + city 
  + ","
  + city
  + ","
  + country
  
  + "&appid=" 

  + ghost);

}

function weatherLogic(apiUrl){
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    
    const firstWeather = getWeatherIcon(data.weather[0].main);
    //returns in kelvin
    const kelvin = data.main.temp;
    //Kelvin to Farenheit conversion
    const k2f = (kelvin-273.15)* (9/5) + 32;
    //prints the weather in F
    const firstInfo = `${k2f.toFixed()}°F Boone`;


    document.querySelector('.first-icon').innerHTML = firstWeather;
    document.querySelector('.first-info').innerHTML = firstInfo;
    // document.querySelector('.first-icon').innerHTML = secondWeather;
    // document.querySelector('.first-info').innerHTML = secondInfo;
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
