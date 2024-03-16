import { useEffect, useState } from 'react'
import './App.css'
/*images*/
import searchIcon from "./assets/search.png";
import snowIcon from "./assets/snow.png";
import clearIcon from "./assets/clear.png";
import rainchIcon from "./assets/rain.png";
import drizzleIcon from "./assets/drizzle.png";
import windIcon from "./assets/wind.png";
import humidityIcon from "./assets/humidity.png";
import fewCloudIcon from "./assets/few-clouds.png";
import scatteredCloudsIcon from "./assets/scattered-clouds.png";
import brokenCloudsIcon from "./assets/broken-clouds.png";
import stormIcon from "./assets/storm.png";
const WeatherDeatils=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
    <>
  <div className='image'>
    <img src={icon} alt="Image" className='icon-image' />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className='lat'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>Longtitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="" className='icon'  />
      <div className="data">
      <div className="humidity-percent">{humidity}%</div>
      <div className="text">Humidity</div>
    </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="" className='icon'  />
      <div className="data">
      <div className="wind-percent">{wind}Km/h</div>
      <div className="text">Wind Speed</div>
    </div>
    </div>
   
  </div>
  </>
  )
} 


function App() {
  let api_key="726826a3a6b377073c6cd26abc1d7fb0";

  const[icon, setIcon]=useState(snowIcon);
  const[temp, setTemp]=useState(0);
  const[city, setCity]=useState("");
  const[country,setCountry]=useState("");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[text,setText]=useState("Jaffna");
  const[cityNotFound,setCityNotFound]=useState(false);
  const[loding,setLoding]=useState(false);
  const[error,setError]=useState(null);

  const weatherIconMap={
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": fewCloudIcon,
    "02n": fewCloudIcon,
    "03d":scatteredCloudsIcon,
    "03n":scatteredCloudsIcon,
    "04d":brokenCloudsIcon,
    "04n":brokenCloudsIcon,
    "09d":drizzleIcon,
    "09n":drizzleIcon,
    "10d":rainchIcon,
    "10n":rainchIcon,
    "11d":stormIcon,
    "11n":stormIcon,
    "13d":snowIcon,
    

  };
  const search= async()=>{
    setLoding(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try {
      let res= await fetch(url);
      let data= await res.json();
      if(data.cod==="404"){
        console.error("City not found");
        setCityNotFound(true);
        setLoding(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode= data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
      setError("");
    } catch (error) {
     /* console.error("An Error occurred", error.message);*/
      setError("City is Empty!!");
      
    }
  finally{
    setLoding(false);
  }
  };

  const handleCity = (e) =>{
    setText(e.target.value);
  };

const handleKeyDown=(e)=>{
  if(e.key==="Enter"){
    search();
  }
};
useEffect(function(){
  search();
},[]);
  return (
    <> 
      <div className="container"> 
        <div className='input-container'>
          <input type="text" className='cityInput' placeholder='Serach City' 
          onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
          <div className='search-icon' onClick={() => search()}>
            <img src={searchIcon} alt="Serach" /> 
          </div>
        </div> 
       
      {loding &&<div className="loding-message">Loading.....</div>}
        {error && !cityNotFound &&  <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City-not-found</div>}
         {!loding && !cityNotFound && !error && < WeatherDeatils icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}
      </div>
      
      
    </>
  )
}

export default App
