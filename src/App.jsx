import { useState, useEffect } from 'react'
import './App.css'
// import Search from './components/Search'
import CurrentWeather from './components/CurrentWeather'
import ForecastWeather from './components/ForecastWeather'


function App() {

  return (
    <div className="App w-full h-screen bg-zinc-700 p-8">
      {/* <Search /> */}
      <CurrentWeather />
      <ForecastWeather />
    </div>
  )
}

export default App
