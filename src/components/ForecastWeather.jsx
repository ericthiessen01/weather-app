import React, {useState, useEffect} from 'react'
import useGeoLocation from '../hooks/useGeoLocation'
import windArrow from '../assets/windArrow.svg'

export default function Weather() {
    const [forecastWeatherData, setForecastWeatherData] = useState([])
    const [loading, setLoading] = useState(true)
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
    const loc = useGeoLocation()

    function getForecastWeatherData() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.coords.lat}&lon=${loc.coords.lon}&appid=${weatherApiKey}&units=metric`)
            .then(res => res.json())
            .then(res => {
                setForecastWeatherData(res.list.reduce((pV, cV) => {
                    const day = new Date(cV.dt * 1000)
                    const key = day.toLocaleDateString([], { dateStyle: 'full'})
                    // cV.dt_txt.substring(0, 10)
                    if(!pV.hasOwnProperty(key)) {
                        return { ...pV, [key]: [cV]} 
                    } else {
                        pV[key].push(cV)
                        return pV
                    }
                }, []))
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(loc.loaded === true){
            getForecastWeatherData()
        }
    }, [loc.loaded])

    
    const forecastHtml = Object.values(forecastWeatherData).map(item => {
        const hourlyHtml = item.map(threeHour => {
            return (
                <div className='p-2 my-2 bg-sky-800 border-stone-300 border grow'>
                    <p>{new Date(threeHour.dt *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <img src={`http://openweathermap.org/img/wn/${threeHour.weather[0].icon}@2x.png`} alt="current weather icon" className='inline-block w-24'/>
                    <p className='text-sm font-light'>{threeHour.weather[0].description}</p>
                    <p className='text-2xl font-bold mb-6'>{Math.round(threeHour.main.temp)}ºC</p>
                    <p>{Math.round(threeHour.main.feels_like)}ºC</p>
                    <p>{Math.round(threeHour.pop * 100)}%</p>
                    <p>{threeHour.rain ? threeHour.rain["3h"] : 0}mm</p>
                    <p>{Math.round(threeHour.wind.speed * 3.6)} km/h 
                    <img src={windArrow} alt="arrow image" className='w-4 inline ml-2' style={{transform: `rotate(${threeHour.wind.deg}deg)`}}/></p>
                    <p>{Math.round(threeHour.main.humidity)}%</p>
                </div>
            )
        })
        return (
            <div key={item.dt} className='w-8/12 mx-auto text-stone-50'>
                <div className='flex justify-start '>
                <div className='w-36 px-6 py-2 my-2 bg-sky-800 border-stone-300 border flex flex-col justify-between'>
                    <h2 className=" text-xl font-semibold">{new Date(item[0].dt *1000).toLocaleDateString([], { weekday: 'long', month: 'long', day: '2-digit' })}</h2>
                    <div className=''>
                        <p>Feels Like</p>
                        <p>POP</p>
                        <p>Rain</p>
                        <p>Wind</p>
                        <p>Humidity</p>
                    </div>
                </div>
                    {hourlyHtml}
                </div>
            </div>
        )
    })
    
    // !loading && console.log(forecastWeatherData)

    return (
        <div>   
            {!loading &&
                forecastHtml
                }
        </div>
    )
}
