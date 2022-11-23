import { useState } from 'react'
import CurrentWeather from './components/CurrentWeather'
import ForecastWeather from './components/ForecastWeather'
import Header from './components/Header'
import useGeoLocation from './hooks/useGeoLocation'

function App() {
  const [units, setUnits] = useState('metric')
  const loc = useGeoLocation()

    function toggleUnits() {
        console.log(units)
        setUnits(prevState => {
            return prevState === 'metric' ? 'imperial' : 'metric'
        })
    }

  return (
    <div>
      {loc.loaded &&
        <div className="text-center w-full h-full bg-slate-200 px-2 md:px-0">
        <Header units={units} toggleUnits={toggleUnits}/>
        <CurrentWeather units={units} loc={loc}/>
        <ForecastWeather units={units} loc={loc}/>
      </div>
      }
    </div>
  )
}

export default App
