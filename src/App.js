
import './App.css';
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('./Icons', false, /\.(png|jpe?g|svg)$/));
const weater_picture_map = new Map()
weater_picture_map.set("clear","Clear-Icon.png");
weater_picture_map.set("sunny","Clear-Icon.png");
weater_picture_map.set("partially cloudy","Partially-Cloudy-Icon.png");
weater_picture_map.set("cloudy","Cloudy-Icon.png");
weater_picture_map.set("Haily","Cloudy-Icon.png");

const boredApiLink = "https://www.boredapi.com/api/activity"
const WeatherApiLink = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Jerusalem%2CNY?unitGroup=il&keyjson"
function App() {
  GetTimeGreating()
  return (
    <div className="App">
      <header id="header" className="App-header">
        <p id = "App-Title" className={`Title`}> Eliyahu Moroz's Weather Finder </p>
        <img id = "weather-logo"/>
        <button id="Weather-Button" className='Weather-Button' onClick = {bfunc}>Show Curret Weather Conditios</button>
        <label id="wclabel"></label>
        <a
          className="App-link"
          href="https://r.mtdv.me/kskLQNtevo"
          target="_blank"
          rel="noopener noreferrer"
        >
          do more than this
        </a>
      </header>
    </div>
    
  );
}
function getUserLocation() {
  return new Promise((resolve, reject) => {
    const successCallback = (position) => {
      console.log(position.coords)
      resolve([position.coords.latitude, position.coords.longitude]);
    };
  
    const errorCallback = (error) => {
      reject([0, 0]);
    };
  
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  });
}
function bfunc()
{
  var button = document.getElementById("Weather-Button")
  var label = document.getElementById("wclabel")
    getUserLocation()
    .then((location) => {
      const [latitude,longitude]= location;
      getWeatherData(latitude,longitude)
      .then((conditions) =>
      {
       label.textContent = GetTimeGreating()+" it is now " + conditions
       var title = document.getElementById("App-Title")
       title.className ="Moved-Title"
       setWeatherPicture(conditions)
      })
      .catch((error) =>
      {
        label.textContent = "couldent get weather info" + error
      })
    })
    .catch((error) => {
      console.log(error); // Handle the error or use a default location
    });
}
function getWeatherData(latitude,longitude) {
  const apiKey = "TLGE7KTZ85EXZQ5FZESH7F948"; // Replace with your Visual Crossing API key
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=us`;
  return new Promise((resolve,reject) =>{
  fetch(`${url}&key=${apiKey}&unitGroup=metric`)
    .then((response) => response.json())
    .then((data) => {
      console.log(`${url}&key=${apiKey}&unitGroup=metric`)
     resolve(data.currentConditions.conditions); // Process the weather data here
    })
    .catch((error) => {
      reject("couldent get weather condition");
    });})
}
function GetTimeGreating()
{
  const current_hour = new Date().getHours()
  if(current_hour >= 2 && current_hour < 12)
  {
    return ("Good morning")
  }
  else if(current_hour >=12 && current_hour<=17)
  {
    return("Good afternoon")
  }
  else if(current_hour>17 && current_hour<11)
    return("Good Evening")
  else
    return("Good night")
}
function setWeatherPicture(condition_text)
{
  var condition = new String(condition_text)
  const picture = weater_picture_map.get(condition.toLowerCase())
  var header = document.getElementById("header")
  var logo = document.getElementById("weather-logo")

  console.log(picture)
  logo.src = images[picture]
  logo.className = "Sunny-Logo"
  header.className = "App-Header-Sunny"

}
export default App;
