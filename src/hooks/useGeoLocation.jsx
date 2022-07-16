import { useEffect, useState } from 'react'

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coords: {lat: "", lon: ""}
    })

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coords: {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            }
        })
    }

    const onError = error => {
        setLocation({
            loaded: true,
            error,
        })
    }

    useEffect(() => {
        if(!("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation not supported"
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])

  return location
}

export default useGeoLocation;
