import React, { useState, useEffect } from 'react'

const SearchBar = ({placeholder}) => {
  const [ingredients, setIngredients] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [ingredientsSelected, setIngredientsSelected] = useState([]);
  const [fetchData, setFetchData] = useState([])

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

  const handleSearch = () => {
    const formatted = ingredientsSelected.map((choice) => {
      return choice.split(' ').join('_')
    })
    const drinkUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${formatted}`
    console.log(drinkUrl)
    
    const fetchDrinkUrl = async () => {
      const response = await fetch(drinkUrl)
      const data = await response.json()
      console.log(data)
      setFetchData(data.drinks.strDrink)
    }
    fetchDrinkUrl()
  }




  return (
    <div className="search">
    <div className="searchInputs">
        <input id="search-word" type="text" placeholder={placeholder} onInput={handleFilter} />
        <input onClick={handleAddIngredient} type="button" value="add ingredient" id="submit-btn"/>
        <input onClick={handleSearch} type="submit" value="search!"/>
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
  <div>
    { ingredientsSelected.map((choice) => {
      return (
        <p>{choice}</p>
      )
    })}
  </div>
  <div>
    <h2></h2>
    <img src='' alt=''/>
    <p></p>
  </div>
</div>
  )
}

export default SearchBar
