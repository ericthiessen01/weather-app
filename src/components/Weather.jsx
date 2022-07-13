import React, {useState, useEffect} from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

export default function Weather() {
    const [currentWeatherData, setCurrentWeatherData] = useState({})
    // const [loading, setLoading] = useState(true)
    const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
    const loc = useGeoLocation()

    function getCurrentWeatherData() {
        fetch(`http://api.weatherbit.io/v2.0/current?key=${weatherApiKey}&lat=${loc.coords.lat}&lon=${loc.coords.lon}`)
            .then(res => res.json())
            .then(data => {
                setCurrentWeatherData(data.data)
                console.log(currentWeatherData[0])
            })    
    }

    useEffect(() => {
        if(loc.loaded === true){
            getCurrentWeatherData()
        }
    }, [loc.loaded])

    return (
        <div>
            <p>
                {loc.loaded ? 
                JSON.stringify(loc) : 
                "data not available"}
            </p>
            
            <ul>
                {/* <li>{currentWeatherData[0].temp}</li>
                <li>{currentWeatherData[0].city_name}</li>
                <li>{currentWeatherData[0].ob_time}</li>
                <li>{currentWeatherData[0].wind_spd}</li>
                <li>{currentWeatherData[0].wind_cdir}</li> */}
            </ul>
        </div>
    )
}
