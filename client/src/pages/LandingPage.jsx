import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
const navigate = useNavigate();
  return (
    <div>
      <div>LandingPage</div>
      <button onClick={() => navigate('/home')}>Home</button>
    </div>
  )
}
