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
                <div className='p-2 xl:my-2 bg-sky-800 border-stone-300 border grow flex xl:flex-col justify-between'>
                    <div className='flex items-end xl:items-center xl:flex-col'>
                        <div>
                            <p>{new Date(threeHour.dt *1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <img src={`http://openweathermap.org/img/wn/${threeHour.weather[0].icon}@2x.png`} alt="current weather icon" className='inline-block w-20 h-12 object-cover'/>
                        </div>
                        <div className='flex flex-col-reverse xl:flex-col w-24'>
                            <p className='text-sm font-light'>{threeHour.weather[0].description}</p>
                            <p className='text-2xl font-bold xl:mb-8'>{Math.round(threeHour.main.temp)}ºC</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center xl:flex-col gap-2 pl-12 pr-6 xl:px-0 grow xl:grow-0'>
                        <p>{Math.round(threeHour.main.feels_like)}ºC</p>
                        <p className='pl-4 xl:pl-0'>{Math.round(threeHour.pop * 100)}%</p>
                        <p>{threeHour.rain ? threeHour.rain["3h"] : 0}mm</p>
                        <div className='xl:flex xl:justify-center'>
                            <p>{Math.round(threeHour.wind.speed * 3.6)} km/h </p>
                            <img src={windArrow} alt="arrow image" className='w-4 inline ml-2' style={{transform: `rotate(${threeHour.wind.deg}deg)`}}/>
                        </div>
                        <p>{Math.round(threeHour.main.humidity)}%</p>
                    </div>
                </div>
            )
        })
        return (
            <div key={item.dt} className='w-full sm:w-11/12 2xl:w-10/12 mx-auto text-stone-50'>
                <div className='flex flex-col justify-start xl:flex-row'>
                    <div className='xl:w-36 px-2 py-2 mt-2 xl:my-2 bg-sky-900 border-stone-300 border flex xl:flex-col  items-center justify-between'>
                        <h2 className=" text-xl font-semibold">{new Date(item[0].dt *1000).toLocaleDateString([], { weekday: 'long', month: 'long', day: '2-digit' })}</h2>
                        <div className='flex justify-between xl:flex-col gap-2 pl-8 xl:pl-0 grow xl:grow-0'>
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

    return (
        <div>   
            {!loading &&
                forecastHtml
                }
        </div>
    )
}
