import React, { useState, useEffect } from 'react'
import DisplayDrinkCard from '../../components/DisplayDrinkCard/DisplayDrinkCard';
import './style.css'

const RandomDrink = () => {

  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/random.php`)
    .then(resp => resp.json())
    .then(data => {
      setDrinks(data.drinks)
    })
  }, [])

  const handleSubmit = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/random.php`)
    .then(resp => resp.json())
    .then(data => {
      setDrinks(data.drinks)
    })
    // window.location.reload()
  }
  
  return (
    <div className='center'>
      <div className='randomDrink1'>
        { drinks && <DisplayDrinkCard drinks={drinks}/>}
      </div>
      <div className='center center-button'>
        <button onClick={handleSubmit}>Another cocktail!</button>
      </div>
    </div>
  )
}

export default RandomDrink
