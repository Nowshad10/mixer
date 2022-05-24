import React, { useEffect, useState } from 'react'
import DisplayDrinkCard from '../../components/DisplayDrinkCard/DisplayDrinkCard';
import FetchApi from '../../components/FetchDrinks'

const PopularDrinks = () => {

  const [drinks, setDrinks] = useState(null);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/popular.php`)
    .then(resp => resp.json())
    .then(data => {
      setDrinks(data.drinks)
    })
  }, [])

  return (
    // <FetchApi/>
    <>
    { drinks && <DisplayDrinkCard drinks={drinks}/>}
    </>
  )
}

export default PopularDrinks
