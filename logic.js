
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    //returns in kelvin
    //const weatherInfo = `${data.main.temp.toFixed()}°F`;

    // (K − 273.15) × 9/5 + 32
    const kelvin = data.main.temp;
    const k2f = (kelvin-273.15)* (9/5) + 32;
    // document.write(kelvin);
    // document.write("\n");
    //document.write(k2f);

    const weatherInfo = `${k2f.toFixed()}°F Boone`;


    document.querySelector('.weather-icon').innerHTML = weatherIcon;
    document.querySelector('.weather-info').innerHTML = weatherInfo;
  })
  .catch(error => console.error(error));

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
