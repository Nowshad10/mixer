import React, { useEffect, useState } from 'react'
import DisplayDrinkCard from '../../components/DisplayDrinkCard/DisplayDrinkCard';

const SearchByName = () => {

  const [nameSelected, setNameSelected] = useState('');
  const [drinks, setDrinks] = useState(null);


  const handleNameSearch = (e) => {
      e.preventDefault()
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameSelected}`)
      .then(response => response.json())
      .then(data => {
          setDrinks(data.drinks)
      })
      e.target.cocktailName.value = ""
  }
  

  return (
      <>
    <form onSubmit={handleNameSearch}>
        <label htmlFor='cocktail-name'>Drink Name</label>
        <input type='text' onChange={(e) => setNameSelected(e.target.value)} name='cocktailName' id='cocktailName'/>
        <input type='submit' value='search for drink'/>
    </form>
    { drinks && <DisplayDrinkCard drinks={drinks} />

    }
    </>
  )
}

export default SearchByName;
