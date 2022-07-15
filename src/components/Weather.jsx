import React, {useState, useEffect} from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

export default function Weather() {
    const [currentWeatherData, setCurrentWeatherData] = useState({})
    const [loading, setLoading] = useState(true)
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
    const loc = useGeoLocation()

    async function getCurrentWeatherData() {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.lat}&lon=${loc.coords.lon}&appid=${weatherApiKey}&units=metric`)
        .then(res => res.json())
        .then(res => {
            setCurrentWeatherData(res)
            console.log(res)
        })
    }

    const currentTime = Intl.DateTimeFormat('en-US', {
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric'
    }).format(currentWeatherData.dt)

    useEffect(() => {
        if(loc.loaded === true){
            getCurrentWeatherData()
            setLoading(false)
        }
    }, [loc.loaded])

    return (
        <div>
            <p>
                {loc.loaded ? 
                JSON.stringify(loc) : 
                "data not available"}
            </p>
            
            {!loading &&
                <p>
                    {currentTime}
                </p>
                }
        </div>
    )
}
