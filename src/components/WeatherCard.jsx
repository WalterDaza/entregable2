import React from 'react'
import { useState } from 'react'

const WeatherCard = ({weather, tempertur}) => {

    const [isCelsius, setIsCelsius] = useState(true)
    
    const changeTemperature = () => setIsCelsius(!isCelsius)

  return (
    <article className='card'>
        <h1 className='card_title'>Weather App</h1>
        <h2 className='card_subtitle'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
        <section className='card_section'>
            <img src={weather ? `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png` : "Error"} alt="" />
            <div className='card_list'>
            <h3 >"{weather?.weather[0].description}"</h3>
            <ul>
                <li><span>Wind Speed</span>{weather?.wind.speed} m/s</li>
                <li><span>Clouds</span>{weather?.clouds.all} %</li>
                <li><span>Pressure</span>{weather?.main.pressure} hPa</li>
            </ul>
            </div>
        </section>
        <section className='card_section_second'>
        <h2 className='card_temperature'>{isCelsius ? `${tempertur?.celsius} °C`: `${tempertur?.farenheit} °F`} </h2>
        <button className='card_button' onClick={changeTemperature}>{isCelsius ? "Change to °F" : "Change to °C"}</button>
        </section>
    </article>
  )
}

export default WeatherCard