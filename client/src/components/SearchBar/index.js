import React, { useState, useEffect } from 'react'


const SearchBar = ({setFilteredData, setIngredientsSelected, ingredientsSelected, filteredData, setClickState, clickState}) => {
  const [ingredients, setIngredients] = useState([])
  
  //const [fetchData, setFetchData] = useState([])

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
    <div className="search">
    <div className="searchInputs">
        <input id="search-word" type="text" placeholder='Enter ingredient' onInput={handleFilter} />
        <input onClick={handleAddIngredient} type="button" value="add ingredient" id="submit-btn"/>
        <input onClick={handleClick} type="button" value="search!"/>
        <div className="searchIcon"> 
        </div>    
    </div>
    {filteredData.length !== 0 && (
    <div className="dataResult">
      {filteredData.map((value, key) => {;    
                return (
                    <div key={key} className='dataItem'>
                        <p onClick={handleIngredientSelect} id="ingredient">{value.strIngredient1} </p> 
                    </div>
                );
            })}  
    </div>
)}
</div>
  )
}

export default SearchBar;
