import React, {useState, useEffect} from 'react'
import windArrow from '../assets/windArrow.svg'

export default function Weather({ units, loc }) {
    const [currentWeatherData, setCurrentWeatherData] = useState({})
    const [loading, setLoading] = useState(true)
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

    function getCurrentWeatherData() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.lat}&lon=${loc.coords.lon}&appid=${weatherApiKey}&units=${units}`)
            .then(res => res.json())
            .then(res => {
                setCurrentWeatherData(res)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }
    
    useEffect(() => {
            getCurrentWeatherData()
    }, [units])

    return (
        <div>   
            {!loading && currentWeatherData &&
            <div className='w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 mx-auto my-8 p-6 text-stone-50 bg-sky-800 grid grid-cols-2 grid-rows-2 gap-4 rounded-lg shadow-2xl shadow-zinc-800'>
                <div className='col-start-1'>
                    <img src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`} alt="current weather icon" className='inline-block w-32'/>
                    <p className='text-sm font-light'>{currentWeatherData.weather[0].description}</p>
                </div>
                <div className='col-start-2'>
                    <p className='text-4xl font-semibold'>
                        {currentWeatherData.name}
                    </p>
                    <p>
                        {new Date(currentWeatherData.dt *1000).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    {units === 'metric' ? <p className='text-6xl sm:text-8xl font-bold'>{Math.round(currentWeatherData.main.temp)}ºC</p> :
                    <p className='text-6xl sm:text-8xl font-bold'>{Math.round(currentWeatherData.main.temp)}ºF</p>}
                    <p className='text-sm font-light'>
                        Updated {new Date(currentWeatherData.dt *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                <div className='text-left'>
                    <p className='text-lg font-semibold'>
                        Details
                    </p>
                    <div className='flex justify-between'>
                        <p>Feels like</p>
                        {units === 'metric' ? <p className='font-semibold'>{Math.round(currentWeatherData.main.feels_like)}ºC</p> :
                        <p className='font-semibold'>{Math.round(currentWeatherData.main.feels_like)}ºF</p>}
                    </div>
                    <div className='flex justify-between'>
                        <p>Wind</p>
                        <div>
                            {units === 'metric' ? <p className='font-semibold inline'>{Math.round(currentWeatherData.wind.speed * 3.6)} km/h</p> :
                            <p className='font-semibold inline'>{Math.round(currentWeatherData.wind.speed)} mph</p> }
                            <img src={windArrow} alt="arrow image" className='w-5 inline ml-2' style={{transform: `rotate(${currentWeatherData.wind.deg}deg)`}}/>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <p>Humidity</p>
                        <p className='font-semibold'>{currentWeatherData.main.humidity}%</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Sunrise</p>
                        <p className='font-semibold'>{new Date(currentWeatherData.sys.sunrise *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Sunset</p>
                        <p className='font-semibold'>{new Date(currentWeatherData.sys.sunset *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
