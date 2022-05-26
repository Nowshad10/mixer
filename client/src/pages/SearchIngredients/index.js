import React, { useState } from 'react'
import MultiSearch from '../../components/MultiSearch'
import SearchBar from '../../components/SearchBar'


function SearchIngredients() {

  const [filteredData, setFilteredData] = useState([]);
  const [ingredientsSelected, setIngredientsSelected] = useState([]);
  const [clickState, setClickState] = useState(false);

//   const handleChange = (value) => {
//     setIngredientsSelected([...ingredientsSelected, value])
//     value = ''
//   }
  return (
    <>
        <SearchBar ingredientsSelected={ingredientsSelected} setIngredientsSelected={setIngredientsSelected} setFilteredData={setFilteredData} filteredData={filteredData} setClickState={setClickState} clickState={clickState}/>
        <MultiSearch ingredients={ingredientsSelected} clickState={clickState}/>
    </>
  )
}

export default SearchIngredients;
