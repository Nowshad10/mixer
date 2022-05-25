import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationButton = ({route, buttonName}) => {
  const navigate = useNavigate();  
  return (
    <button onClick={() => navigate(`/${route}`)}>{buttonName}</button>
  )
}

export default NavigationButton
