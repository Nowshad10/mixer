import React, { useState, useEffect } from 'react'
import './style.css'

const SearchBar = ({setFilteredData, setIngredientsSelected, ingredientsSelected, filteredData, setClickState, clickState}) => {
  const [ingredients, setIngredients] = useState([])

  const searchWordInput = document.querySelector('#search-word')

  const handleFilter = (e) => {
    const searchWord = e.target.value
    const newFilter = ingredients.filter((value) => {
      return value.strIngredient1.toLowerCase().includes(searchWord.toLowerCase())
    })
    if (searchWord === "") {
      setFilteredData([])
    } else {
    setFilteredData(newFilter)
    }
  } 

  useEffect(() => {
      fetch("https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list")
      .then((resp) => resp.json())
      .then((data) => {
          setIngredients(data.drinks)
      })
  }, [])

  const handleIngredientSelect = (e) => {
    const selected = e.target.textContent
    searchWordInput.value = selected
  }

  const handleAddIngredient = () => {
    setIngredientsSelected([...ingredientsSelected, searchWordInput.value])
    console.log(ingredientsSelected)
    searchWordInput.value = ""
  }

  const handleClick = () => {
    setClickState((prevState) => !prevState)
    console.log(clickState)
  }

console.log(ingredientsSelected)

  return (
    <div id="search">
      <h2>Add your ingredients to see what you can mix!</h2>
      <form className="search-inputs">
          <input id="search-word" type="text" placeholder='Enter ingredient' onInput={handleFilter} autoComplete='off'/>
          <input onClick={handleAddIngredient} type="button" value="add ingredient" id="submit-btn"/>
          <input onClick={handleClick} type="button" value="search!" id='search-btn'/>
          {/* <div className="searchIcon"> 
          </div>     */}
      </form>
    <div className="show-ingredients">
      {filteredData.length !== 0 && (
      <div id="data-result">
        {filteredData.map((value, key) => {;    
                  return (
                      <div key={key} className='data-item'>
                          <p onClick={handleIngredientSelect} className="ingredient">{value.strIngredient1} </p> 
                      </div>
                  );
              })}  
      </div>
  )}
  <ol id="ing-list">
  {ingredientsSelected.map((ing, key) => {
      return (
        <li key={key}>{ing}</li>
      )
    })}
  </ol>
    
    </div>  
    
</div>
  )
}

export default SearchBar
