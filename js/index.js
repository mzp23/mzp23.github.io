
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
const city = getQueryVariable("city");
const terms = getQueryVariable("terms");
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e0e1997ea11bf99f599ef17bfa2183c2`;

let variables = {
        forecastImg: document.querySelector('.forecast__img'),
        location: document.querySelector('.location'),
        flag: document.querySelector('.flag'),
        locationForecast: document.querySelector('.location__forecast'),
        temperature: document.querySelector('.temperature'),
        deepInfo: document.querySelector('.deepinfo')

}
function convertTemperature(temper){
        let celcius = (temper - 273.15).toFixed(1);
        if(celcius === "0.0"){
                return 0
        } else {
                return celcius;
        }
        
}
function sendRequest() {
    fetch(url).then(function (response){
        response.json().then(function(data) {  
                variables.forecastImg.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                variables.location.textContent = `${data.name}, ${data.sys.country}`;
                variables.flag.src = `http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`;
                variables.locationForecast.textContent = `${data.weather[0].description}`;
                variables.temperature.textContent = `${convertTemperature(data.main.temp)}°С`;
                variables.deepInfo.textContent = `temperature from ${convertTemperature(data.main.temp)} to ${convertTemperature(data.main.temp_max)} °С, wind ${data.wind.speed} m/s. Clouds ${data.clouds.all} %, ${data.main.pressure} hpa`;
            
              });
  })
}

sendRequest();
