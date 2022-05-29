let wkey = "64a1b2bf693c8827c861e064d96655e2";
let mapKey = "AIzaSyAMfYJBZcCXyMHGLflyIx3XRqD2KgmR0-Q";

let showAll = document.getElementById("showData");
let div1 = document.getElementById("name");
let div3 = document.getElementById("sun");
let sunriseDiv = document.getElementById("sunrise");
let sunsetDiv = document.getElementById("sunset");
// let tempDiv = document.getElementById("temp");
let rightDiv = document.getElementById("rightBox");
var tempWeekDiv = document.getElementById("tempWeekDiv");

var otherInfo = document.getElementById("otherInfo");
var rightBottom = document.getElementById("rightBottom");
var mapDiv = document.getElementById("mapDiv");

window.addEventListener("load", (event) => {
  weather();
});

async function weather() {
  mapDiv.innerText = "";
  try {
    let city = document.getElementById("cityName").value || "patna";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${wkey}&units=metric`;
    var iframeTag = document.createElement("iframe");
    iframeTag.src = `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${city}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log("data :", data);
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    let weekDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${wkey}&units=metric`;

    const response = await fetch(weekDay);
    const weekData = await response.json();
    console.log("~ weekData", weekData);

    mapDiv.append(iframeTag);

    weekDisplay(weekData);
    displayWeather(data);
  } catch (err) {
    console.log("Error", err);
  }
}

function weekDisplay(weekData) {
  tempWeekDiv.innerText = "";
  otherInfo.innerText = "";
  weekData.daily.forEach((element) => {
    var tempDiv = document.createElement("div");
    tempDiv.setAttribute("id", "tempDiv");
    var day = document.createElement("p");
    var maxP = document.createElement("p");
    var minP = document.createElement("p");
    var tempImg = document.createElement("img");
    tempImg.setAttribute("id", "tempImg");

    var date = new Date(element.dt * 1000).toString();
    var dayName = date.slice(0, 3);
    day.innerText = dayName;

    var iconcode = element.weather[0].icon;
    var wIcon = `http://openweathermap.org/img/wn/${iconcode}@2x.png`;
    tempImg.src = wIcon;

    maxP.innerText = Math.round(element.temp.max) + "°C";
    minP.innerText = Math.round(element.temp.min) + "°C";

    tempDiv.append(day, tempImg, maxP, minP);

    tempWeekDiv.append(tempDiv);
  });

  var humi = document.createElement("p");
  var visi = document.createElement("p");
  var wind = document.createElement("p");
  var wStatus = document.createElement("p");
  var otherText = document.createElement("p");
  otherText.innerText = "Other Info";
  otherText.style.color = "tomato";
  otherText.style.marginBottom = "10px";
  otherText.style.textAlign = "center";

  humi.innerHTML = "Humidity: " + `<span>${weekData.current.humidity}</span>`;
  visi.innerHTML =
    "Visibility: " + `<span>${weekData.current.visibility}</span>`;
  wind.innerHTML =
    "Wind Speed: " + `<span>${weekData.current.wind_speed}</span>`;
  wStatus.innerHTML =
    "Weather: " + `<span>${weekData.current.weather[0].description}</span>`;
  otherInfo.append(otherText, humi, visi, wind, wStatus);
}

function displayWeather(data) {
  showAll.innerText = "";
  div1.innerText = "";
  div3.innerText = "";
  sunriseDiv.innerText = "";
  sunsetDiv.innerText = "";

  var iconcode = data.weather[0].icon;
  var wIcon = `http://openweathermap.org/img/wn/${iconcode}@2x.png`;

  var name = document.createElement("div");
  name.setAttribute("id", "getName");
  name.innerText = data.name;
  console.log("~ data", data);

  var img = document.createElement("img");
  img.setAttribute("id", "iconImg");
  img.src = "https://cdn-icons-png.flaticon.com/512/1146/1146915.png";

  var temp = document.createElement("p");
  temp.setAttribute("id", "tempValue");
  temp.innerText = Math.round(data.main.temp) + "°C";

  var date1 = new Date(data.sys.sunrise * 1000).toString();
  var sunrise = date1.slice(16, 24);

  var date2 = new Date(data.sys.sunset * 1000).toString();
  var sunset = date2.slice(16, 24);

  var sunriseP = document.createElement("p");
  sunriseP.innerText = sunrise;
  var imgSun = document.createElement("img");
  imgSun.src = "https://cdn-icons-png.flaticon.com/512/3233/3233728.png";
  var sunText = document.createElement("p");
  sunText.innerText = "Sunrise";
  sunText.setAttribute("class", "sun");
  sunriseDiv.append(imgSun, sunText, sunriseP);

  var sunsetP = document.createElement("p");
  sunsetP.innerText = sunset;
  var imgSet = document.createElement("img");
  imgSet.src = "https://cdn-icons-png.flaticon.com/512/2924/2924900.png";
  var setText = document.createElement("p");
  setText.innerText = "Sunset";
  setText.setAttribute("class", "sun");
  sunsetDiv.append(imgSet, setText, sunsetP);

  var TodayDate = document.createElement("p");
  TodayDate.setAttribute("id", "todayDate");
  var tDate = new Date().toString();
  TodayDate.innerText = tDate.slice(0, 15);

  div1.append(name, img);

  div3.append(sunriseDiv, sunsetDiv);
  showAll.append(div1, temp, div3, TodayDate);
}
