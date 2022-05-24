import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

function MultiSearch() {

const ingredients = ['Vodka','Tequila', 'Orange juice', 'Grenadine']

function getCombinations(valuesArray) {

    let combi = [];
    let temp = [];
    let slent = Math.pow(2, valuesArray.length);

    for (let i = 0; i < slent; i++)
    {
        temp = [];
        for (let j = 0; j < valuesArray.length; j++)
        {
            if ((i & Math.pow(2, j)))
            {
                temp.push(valuesArray[j]);
            }
        }
        if (temp.length > 0)
        {
            combi.push(temp);
        }
    }

    combi.sort((a, b) => a.length - b.length);
    // console.log(combi.join("\n"));
    // console.log(combi.filter(x => x.length > 1))
    combi = combi.filter(x => x.length > 1)
// Fetch data with combinations array    
    let drinkList = []
    const fetchAll = async (combi) => {
        for (let i = 0; i < combi.length; i++) {
            let possible = await axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${combi[i].join(',')}`)
            let data = possible.data.drinks
            // console.log(possible.data.drinks)
            typeof(data) !== 'string' && drinkList.push(data)
        }
       // console.log(drinkList)
        //flatten array of arrays into one.
        const concatList = drinkList.flat(1)
        //console.log(concatList)
        let fullList = []

        //lookup each drink into new array with full details
        for (let i = 0; i < concatList.length; i++) {
            let res = await axios.get(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${concatList[i].idDrink}`)
            let data = res.data.drinks
            fullList.push(data)
        }
        //Flatten array of arrays into single array
        fullList = fullList.flat(1)
        console.log(fullList)

        let result = []
        let valid = true;
       let resultMap = fullList.map(drink => {
            for (let i = 1; i <= 15; i++) {
                console.log(drink[`strIngredient${i}`])
                if (drink[`strIngredient${i}`] !== null && ingredients.indexOf(drink[`strIngredient${i}`]) === -1) {
                    valid = false;
                    break;
                } else {
                    valid = true;
                }
            }
            console.log(valid)
            valid === true && result.push(drink)
            
        })

        console.log(result)
       // Map array list, convert each drink object into key:value array of arrays &
       // Filter out so we only have drink id and ingredients
        // const ingList = fullList.map(drink => Object.entries(drink).filter(x => x[0].includes('strIngredient') && x[1] !== null || x[0].includes('idDrink')))


        // console.log(ingList)
        // console.log('can drink be made with ingredients? ', ingredients.every(i => ingList.some(([, val]) => val === i)) ? 'Yes' : 'No');
        
        // For each object, loop through ingredients.
        // i.e. if (ingredients.indexOf{strIngredient[i]} !== -1) {
        //  then ingredient is in the array -> carry on loop
        // if all ingredients in array, push drink to new array,
        // else exit loop and loop through next drink

         
        // console.log(result)   
    }
    fetchAll(combi)
}
getCombinations(ingredients);



// let result = ingredients.flatMap(
//     (v, i) => ingredients.slice(i+1).map( w => v + ' ' + w )
// );

// console.log(result);


// for (let i = 0; i < ingredients.length; i++) {
//     for (let y = 0; y < ingredients.length; y++) {

//     }
// }

// const fetch1 = async () => {
    
//     const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredients[0]}`)
//     const result1 = await response.json()
//     const res1 = result1.drinks
//     //console.log(res1)
// }

// const fetch2 = async () => {
    
//     const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredients[1]}`)
//     const result2 = await response.json()
//     const res2 = result2.drinks
//     //console.log(res2)
// }

// const fetch3 = async () => {
    
//     const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredients[2]}`)
//     const result3 = await response.json()
//     const res3 = result3.drinks
//     const idMap = res3.map(drink => drink.idDrink) 
//     console.log(idMap)
//     let array = []

//     for (let i = 0; i < idMap.length; i++) {
//        let res = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${idMap[i]}`)
//        let data = await res.json()
//        console.log(data)
//        array.push(data)
//     }

//     console.log(array)

//     array = array.map(drink => drink.drinks.includes !== null)
//     console.log(array)
    
// }

// const fetch4 = async () => {
    
//     const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${ingredients[3]}`)
//     const result4 = await response.json()
//     const res4 = result4.drinks
//     //console.log(res4)
// }


// useEffect(() => {
//     fetch1()
//     fetch2()
//     fetch3()
//     fetch4()
// }, [])


  return (
    <div>MultiSearch</div>
  )
}

export default MultiSearch
