import { useState } from "react"

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'ead7a02ae0fb80891a7738f48ba68597'
    const kelvin = 273.15
  
    const [city, setCity] = useState('')
    const [dataWeather, setDataWeather] = useState(null)


  const handleCityLocation = (e) => {
    setCity(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.length > 0) fetchWeather()
  }

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
      const data = await response.json()
      setDataWeather(data)
    } catch (error) {
      console.error('Hubo un problema: ', error);
    }
  }



  return (
    <div className="container">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityLocation}
          className="input-weather"
        />
        <button type="submit" className="Search-button">Search</button>
      </form>
      {
        dataWeather && (
          <div className="Weather-container">
            <h2>{dataWeather.name}</h2>
            <p>Temperature: {parseInt(dataWeather?.main?.temp - kelvin)} °C</p>
            <p>Metereologic condition: {dataWeather.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`} className="icon"/>
          </div>
        )
      }
    </div>
  )
}
