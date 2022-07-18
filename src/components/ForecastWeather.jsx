import React, {useState, useEffect} from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

export default function Weather() {
    const [forecastWeatherData, setForecastWeatherData] = useState([])
    const [loading, setLoading] = useState(true)
    const [formattedData, setFormattedData] = useState([])
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
    const loc = useGeoLocation()

    function getForecastWeatherData() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.coords.lat}&lon=${loc.coords.lon}&appid=${weatherApiKey}&units=metric`)
            .then(res => res.json())
            .then(res => {
                setForecastWeatherData(res.list)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(loc.loaded === true){
            getForecastWeatherData()
        }
    }, [loc.loaded])

    
    const formattedDate = forecastWeatherData.map(item => {

    })

    // const forecastHtml = forecastWeatherData.map(item => {
    //     const day = item.dt_txt.substring(0, 10)
    //     if(prevVal.includes(day)) {

    //     }

    //     if(item.dt_txt.substring(11) === '12:00:00') {
    //         return item
    //     } if(item.dt_txt.substring(11) === '03:00:00') {
    //         return item
    //     }
    // })

    !loading && console.log(forecastWeatherData[0].dt_txt.substring(0, 10))


    return (
        <div>   
            {!loading &&
                <p>
                </p>
                }
        </div>
    )
}
