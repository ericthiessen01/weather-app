import { useState, useEffect } from 'react'
import './App.css'
// import Search from './components/Search'
import CurrentWeather from './components/CurrentWeather'
import ForecastWeather from './components/ForecastWeather'


function App() {

  return (
    <div className="App w-full h-full bg-slate-300 p-2 box-border">
      {/* <Search /> */}
      <CurrentWeather />
      <ForecastWeather />
    </div>
  )
}

export default App
