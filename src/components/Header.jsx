import React from 'react'

export default function Header({ toggleUnits }) {

  return (
    <div className='bg-sky-800 p-2 text-white flex items-center justify-center gap-2'>  
      <p className="text-sm font-medium text-white">Metric</p>
      <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div onClick={toggleUnits} className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
      <p className="text-sm font-medium text-white">Imperial</p>
    </div>
  )
}
