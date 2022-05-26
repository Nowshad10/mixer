import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import './style.css'
import ClipLoader from "react-spinners/ClipLoader";
import DisplayDrinkCard from '../DisplayDrinkCard/DisplayDrinkCard';

function MultiSearch({ingredients, clickState}) {
    console.log(clickState)
    const [filtResult, setFiltResult] = useState([])
    const [loading, setLoading] = useState(false)
    let [color, setColor] = useState("red");

    let originalIngredients = ingredients;
    console.log(originalIngredients)

function getCombinations(valuesArray) {
    setLoading(true)
    let combi = [];
    let temp = [];
    let slent = Math.pow(2, valuesArray.length);
    for (let i = 0; i < slent; i++) {
        temp = [];
        for (let j = 0; j < valuesArray.length; j++) {
            if ((i & Math.pow(2, j))) {
                temp.push(valuesArray[j]);
            }
        }
        if (temp.length > 0) {
            combi.push(temp);
        }
    }
    combi.sort((a, b) => a.length - b.length); 
    combi = combi.filter(x => x.length > 1)
    console.log(combi)
// Fetch data with combinations array    
    let drinkList = []
    let clen = combi.length

    const fetchAll = async (combi) => {
        for (let i = 0; i < clen; i++) {
            let possible = await axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${combi[i].join(',')}`)
            let data = possible.data.drinks
            typeof(data) !== 'string' && drinkList.push(data)
        }
        //flatten array of arrays into one.
        const concatList = drinkList.flat(1)
        let fullList = []
        let conLen = concatList.length
        //lookup each drink into new array with full details
        for (let i = 0; i < conLen; i++) {
            let res = await axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${concatList[i].idDrink}`)
            let data = res.data.drinks
            fullList.push(data)
        }
        //Flatten array of arrays into single array
        fullList = fullList.flat(1)
        console.log(fullList)
        
        fullList.length > 0 && originalIngredients.push('Salt', 'Olive', 'Sugar', 'Water', 'Ice', 'Lemon peel', 'Orange peel', 'Orange spiral')
        let result = []
        let valid;
        let newIngredients = originalIngredients.map(x => x.toLowerCase().replace(/\s/g, ''))
        console.log(newIngredients)
        fullList.forEach(drink => {
            for (let i = 1; i <= 15; i++) {
                if (drink[`strIngredient${i}`] !== null && !newIngredients.includes(drink[`strIngredient${i}`].toLowerCase().replace(/\s/g, ''))) {
                    valid = false;
                    break;
                } else {
                    valid = true
                }  
            }
           
            if (valid === true) {
                result.push(drink)
            } else {
            }         
        })
        newIngredients.length = 0
        console.log(result) 
        console.log(newIngredients)

        // Filter result to remove duplicates
        const ids = result.map(x => x.idDrink)
        const filtered = result.filter(({idDrink}, index) => !ids.includes(idDrink, index + 1))
        setFiltResult(filtered)

        setLoading(false)

    }
    fetchAll(combi) 
}
   useEffect(() => {
    getCombinations(originalIngredients);
    
   }, [clickState])
  
   const clearResults = () => {  
        originalIngredients.length = 0;
        setFiltResult([])   
    }
   
 console.log(filtResult)
 //console.log(loading)
   
  return (
<>
    <div className="center">
        {filtResult.length !== 0 && <button onClick={clearResults}>Clear</button>}
    </div>
    
        {loading ?  (
            <div className="center">
                <ClipLoader color={color} loading={loading}  size={100} />
            </div>
            

        ) : (

        filtResult.length !== 0 && 
            <div className="grid-container">
                <DisplayDrinkCard drinks={filtResult} />
            </div>
        
        
                 
        )      
    }
     
</>  

  )
}

export default MultiSearch;
