import React, {useState, useEffect} from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

export default function Weather() {
    const [currentWeatherData, setCurrentWeatherData] = useState({})
    const [loading, setLoading] = useState(true)
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
    const loc = useGeoLocation()

    function getCurrentWeatherData() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${loc.coords.lat}&lon=${loc.coords.lon}&appid=${weatherApiKey}&units=metric`)
            .then(res => res.json())
            .then(res => {
                setCurrentWeatherData(res)
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(loc.loaded === true){
            getCurrentWeatherData()
            setLoading(false)
        }
    }, [loc.loaded])

    return (
        <div>   
            {!loading &&
                <p>
                </p>
                }
        </div>
    )
}
