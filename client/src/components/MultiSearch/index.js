import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import './style.css'
import DisplayDrinkCard from '../DisplayDrinkCard/DisplayDrinkCard';

function MultiSearch({ingredients, clickState}) {
    console.log(clickState)
    const [filtResult, setFiltResult] = useState([])
    
    let originalIngredients = ingredients;
    console.log(originalIngredients)

function getCombinations(valuesArray) {
    
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
    // console.log(combi.join("\n"));
    console.log(combi.filter(x => x.length > 1))
    combi = combi.filter(x => x.length > 1)
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
        console.log('Fulllist',fullList)
        fullList.length > 0 && originalIngredients.push('Salt', 'Olive', 'Sugar')
        let result = []
        let valid;
        console.log(originalIngredients)
        fullList.forEach(drink => {
            for (let i = 1; i <= 15; i++) {
                console.log(drink.strDrink)
                console.log(drink[`strIngredient${i}`])   
                console.log(originalIngredients)
                if (drink[`strIngredient${i}`] !== null && !originalIngredients.includes(drink[`strIngredient${i}`])) {
                    valid = false;
                    break;
                } else {
                    valid = true
                }
                
                // if (originalIngredients.indexOf(drink[`strIngredient${i}`]) === -1) {
                //     console.log('If statement triggered')
                //     console.log(drink.strDrink)
                //     valid = false;
                //     console.log('Exiting loop')
                //     break;
                // } else {
                //     console.log('Valid is true!')
                //     valid = true;
                // }    
            }
            console.log(valid)
            if (valid === true) {
                result.push(drink)
                console.log('Drink pushed')
            } else {
                console.log('Drink not pushed')
            }
           //valid === true && result.push(drink)
        })
        console.log(result) 
        // Filter result to remove duplicates
        const ids = result.map(x => x.idDrink)
        const filtered = result.filter(({idDrink}, index) => !ids.includes(idDrink, index + 1))
        setFiltResult(filtered)
        originalIngredients = []
    }
    fetchAll(combi) 
}
useEffect(() => {
    getCombinations(originalIngredients);
}, [clickState])

// if (filtResult) {
//     originalIngredients = []
// }
 console.log(filtResult)
   
  return (
    filtResult.length !== 0 ? filtResult.map(drink => {
        console.log(drink)
        const {strDrink, strDrinkThumb} = drink

        return (
            <>
                {/* <h2>{strDrink}</h2>
                <img className="multi-search" src={strDrinkThumb} alt={strDrink} /> */}
                <DisplayDrinkCard drinks={filtResult}/>

            </>
            
        )
    })
    :
    <h2>No search rn</h2> 
  )
}

export default MultiSearch;
