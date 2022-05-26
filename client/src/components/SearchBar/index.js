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
    const dropDown = document.querySelector('#data-result')
    setIngredientsSelected([...ingredientsSelected, searchWordInput.value])
    searchWordInput.value = ""
    //filteredData.length = 0;
  }

  const handleClick = () => {
    setClickState((prevState) => !prevState)
    console.log(clickState)
    filteredData.length = 0;
  }

  const handleDelete = (e) => {
    console.log(e.target.id)
    setIngredientsSelected((prevState) => prevState.filter((prevItem ) => prevItem !== e.target.id))
  }

console.log(ingredientsSelected)

  return (
    <div id="search">
      <h2 id='h2-search'>Add your ingredients to see what you can mix!</h2>
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
        <div className='ing-li'>
         <p id={ing}className='ing-delete' onClick={handleDelete}>&times;</p> <li className='ing-p' key={key}>{ing}</li> 
        </div>
                 
      )
    })}
  </ol>
    
    </div>  
    
</div>
  )
}

export default SearchBar
