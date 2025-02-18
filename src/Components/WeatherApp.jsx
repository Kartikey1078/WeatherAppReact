import React, { useEffect, useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
    const [cityInput, setCityInput] = useState("Delhi"); 
    const [weather, setWeather] = useState(null);   
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);
    
    const search = async () => {
        debugger
        setLoading(true);
        setError(null);
        const apid = "f34880881fffc331a8fdb1689112d0ea";
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apid}`;
            let response = await fetch(url);
            let data = await response.json();
            
            if (data.cod === "404") {
                setError("City not found");
                setLoading(false);
                return;
            }
            console.log(data)
            setWeather({
                humidity: data.main.humidity,
                speed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
                desc: data.weather[0].main
            });
        } catch (error) {
            setError("City not Found");
        }
        setLoading(false);
    };

    function HideNotFound() {
        debugger
        setError(false)
    }

    

    return (
        <div className="weather-container">
            <h3 className='h3'>Weather App</h3>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)} 
                />
                <button onClick={search}>Search</button>
            </div>
          
   
    
    
            {loading && <p style={{ color: '#ff7b00' }}>Fetching data...</p>}

            {error && 
            <div style={{position: 'absolute', width: '320px',borderRadius:'20px', height: '220px',backgroundColor: 'white',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
                <p className='pTag' style={{ color: 'red', fontWeight: 'bold',width: '321px',height: '220px'  }}>{error}</p>
                <button style={{top:'5px',right:'10px',position:'absolute'}} onClick={HideNotFound}>Close</button>
            </div>
             }

            {weather && (
                <>
                    <div className="weather-icon">
                        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather Icon" />
                    </div>

                    <div className="weather-info">
                        <p className="temperature">{weather.temperature}°C</p>
                        <p className="city">{weather.location}</p>
                        <p>{weather.desc}</p>
                    </div>

                    <div className="weather-details">
                        <div className="detail-box">
                            <p>{weather.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        <div className="detail-box">
                            <p>{weather.speed} km/hr</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherApp;
