import { useState, useEffect } from 'react'
import './App.css'
import CurrentWeather from './components/CurrentWeather'
import ForecastWeather from './components/ForecastWeather'
import Header from './components/Header'


function App() {
  const [units, setUnits] = useState('metric')

    function toggleUnits() {
        console.log(units)
        setUnits(prevState => {
            return prevState === 'metric' ? 'imperial' : 'metric'
        })
    }

  return (
    <div className="App w-full h-full bg-slate-300 p-2 box-border">
      <Header units={units} toggleUnits={toggleUnits}/>
      <CurrentWeather units={units}/>
      <ForecastWeather units={units}/>
    </div>
  )
}

export default App
