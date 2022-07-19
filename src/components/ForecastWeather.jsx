import React, {useState, useEffect} from 'react'
import useGeoLocation from '../hooks/useGeoLocation'

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
                    const key = cV.dt_txt.substring(0, 10)
                    if(!pV.hasOwnProperty(key)) {
                        return { ...pV, [key]: [cV]} 
                    } else {
                        pV[key].push(cV)
                        return pV
                    }
                }, {}))
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(loc.loaded === true){
            getForecastWeatherData()
        }
    }, [loc.loaded])

    
    const forecastHtml = Object.values(forecastWeatherData).forEach(item => item.map(hour => console.log(hour.main.temp)))

    // const mappedArr = forecastHtml.map(arr => {
    //     return(arr.map(item => item.main.temp))
    // })
    
    
    !loading && console.log(forecastHtml)

    return (
        <div>   
            {/* {!loading &&
                {forecastHtml}
                } */}
        </div>
    )
}
