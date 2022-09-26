import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { Loading } from './components/Loading'
import WeatherCard from './components/WeatherCard'
import video from './style/fondo.mp4'

function App() {

  const [coords, setCoords] = useState() // guarda las coordenadas
  const [weather, setWeather] = useState() // guarda el clima
  const [tempertur, setTempertur] = useState() // guarda la temperatura

  useEffect (() => {
    const success = pos =>{
      const obj = { // se crea un nuevo obejeto donde traemos la latitud y longitud de la geolocation del navegador
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      }
      setCoords(obj)
    }
    navigator.geolocation.getCurrentPosition(success) // accede a la ubicación actual mediante el navegador
  }, [])

    // console.log(coords)
//------------peticion del clima -------------
  useEffect (() => {
    if (coords){ // se condiciona para que se ejecute el axios solo cuando llegue coords
    const APIKEY = "8750230d6e854b348a7f0fda73d42eb5"
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${APIKEY}`
    axios.get(URL)
      .then(res => {
        const celsius = (res.data.main.temp - 273.15).toFixed(0) // convierte a celsius, toFixed es para eliminar los decimales
        const farenheit = (celsius * 9/5 + 32).toFixed(0) // convierte a farenheit
        setTempertur({celsius, farenheit})
        setWeather(res.data)})
      .catch(err => console.log(err))
    }
  }, [coords])

  console.log(weather)

  return (
    <div className="App">
      <video className='fondo_video' autoPlay loop muted>
      <source src={video}/>
      </video>
      {
        weather ? 
        <WeatherCard 
        weather = {weather}
        tempertur = {tempertur}
      />:
      <Loading />
      }
    </div>
  )
}

export default App
