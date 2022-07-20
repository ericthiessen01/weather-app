import React from 'react'

export default function Header({ toggleUnits }) {

  return (
    <div>
        <button onClick={toggleUnits}>toggle</button>
    </div>
  )
}
