var search = document.getElementById("upper-search");
var butup = document.getElementById("upper-btn");
var mainBody = document.getElementsByClassName("main-container")[0];
var dataBody = document.getElementsByClassName("weather-data")[0];
var submit = true;

var Celsius = "Celsius";
var Fahrenheit = "Fahrenheit";
var celtofahren;
async function getdata(data) {
  const res = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      data +
      "&appid=f190a0abeaeaaf5380c205502c29c38c"
  );
  const get = await res.json();
  console.log(get);
  if (get.message === "city not found") {
    console.log("Hello");
    alert("this location not found");
  } else {
    getweather(get);
  }
}

var toggle=true;


function format(sun) {
  let date = new Date(sun * 1000);
  var timestr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timestr;
}

function getweather(get) {
  //const sun=sunrise()
  const citydatacard = `<div class="city-name">${get.name}, ${
    get.sys.country
  }</div>
    <div class="data-city">
    <div class="city-data" id = "temp"><img src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/20/000000/external-temperature-nature-wanicon-lineal-color-wanicon.png"/>  Temp:
     ${
      (get.main.temp - 273).toFixed(2) 
    } ${toggle?Celsius:Fahrenheit} </div>
    <div class="city-data" id = "feel"><img src="https://img.icons8.com/doodle/20/000000/climate-change.png"/>  Feel:
     ${
      (get.main.feels_like - 273).toFixed(2)
      } ${toggle?Celsius:Fahrenheit}</div>
    <div class="city-data"><img src="http://openweathermap.org/img/wn/${
      get.weather[0].icon
    }.png">  ${get.weather[0].main}</div>
    <div class="city-data"><img src="http://openweathermap.org/img/wn/${
      get.weather[0].icon
    }.png">  Conditions: ${get.weather[0].description}</get></div>
    <div class="city-data"><img src="https://img.icons8.com/glyph-neue/20/4a90e2/atmospheric-pressure.png"/>  Pressure: ${
      get.main.pressure
    } hpa</div>
    <div class="city-data"><img src="https://img.icons8.com/color/20/000000/humidity.png"/>  Humidity: ${
      get.main.humidity
    } %</div>
    <div class="city-data"><img src="https://img.icons8.com/clouds/20/000000/wind.png"/>  Wind Speed: ${
      get.wind.speed
    } m/sec</div>
    <div class="city-data"><img src="https://img.icons8.com/external-justicon-lineal-color-justicon/20/000000/external-cloud-weather-justicon-lineal-color-justicon-1.png"/>  Cloudiness: ${
      get.clouds.all
    }%</div>
    <div class="city-data"><img src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/20/000000/external-sunrise-weather-prettycons-lineal-color-prettycons.png"/>  Sunrise: ${format(
      get.sys.sunrise
    )}</div>
    <div class="city-data"><img src="https://img.icons8.com/external-prettycons-flat-prettycons/20/000000/external-sunset-weather-prettycons-flat-prettycons.png"/>  Sunset: ${format(
      get.sys.sunset
    )}</div>
    </div>
    <button id="celsius" class="celfa">Celsius/Fahrenheit</button>`;
  dataBody.innerHTML = citydatacard;
  celtofahren=document.getElementById("celsius");
    //
  celtofahren.addEventListener("click", (e)=>{
    console.log("hello");
    if(toggle){
        get.main.temp = (get.main.temp*(9/5))+32;
        get.main.feels_like = (get.main.feels_like*(9/5))+32;
        console.log(get.main.temp)
        toggle=false;
    }
    else{
        get.main.temp=(get.main.temp - 32)*5/9;
        get.main.feels_like=(get.main.feels_like - 32)*5/9;
        toggle=true;
    }
    getweather(get);
})
}

var data;
butup.addEventListener("click", (e) => {
  data = search.value;

  if (data) {
    getdata(data);
    search.value = " ";
    mainBody.style.display = "none";
    dataBody.style.display = "flex";
  }
});