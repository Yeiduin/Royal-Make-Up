import React from 'react'
import { useNav } from '../hooks/useNav';

export const Details = () => {

  const {goHome} = useNav();


  return (
    <div>
      

      <button onClick={goHome}>Home</button>
    </div>
  )
}
