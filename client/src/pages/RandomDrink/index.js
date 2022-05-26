import React, { useState, useEffect } from 'react'
import DisplayDrinkCard from '../../components/DisplayDrinkCard/DisplayDrinkCard';

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
    window.location.reload()
  }
  
  return (
    <div>
      <center>
      { drinks && <DisplayDrinkCard drinks={drinks}/>}
      <input type='submit' value='another random cocktail' onClick={handleSubmit}/>
      </center>
    </div>
  )
}

export default RandomDrink
