import React, { useEffect, useState } from 'react'
import DisplayDrinkCard from '../../components/DisplayDrinkCard/DisplayDrinkCard';
import './style.css'

const SearchByName = () => {

  const [nameSelected, setNameSelected] = useState('');
  const [drinks, setDrinks] = useState(null);


  const handleNameSearch = (e) => {
      e.preventDefault()
      fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${nameSelected}`)
      .then(response => response.json())
      .then(data => {
          setDrinks(data.drinks)
      })
      e.target.cocktailName.value = ""
  }
  

  return (
      <>
      <center><form onSubmit={handleNameSearch}>
        <label id="drink-name-label" className='text-white' htmlFor='cocktail-name' >Drink Name</label>
        <input type='text' onChange={(e) => setNameSelected(e.target.value)} name='cocktailName' id='cocktailName' placeholder='i.e. Martini'/>
        <button type='submit'>Search for drink</button>
    </form>
    <div className='grid-container'>
      { drinks && <DisplayDrinkCard drinks={drinks} /> }
    </div></center>
    
    
    </>
  )
}

export default SearchByName;
