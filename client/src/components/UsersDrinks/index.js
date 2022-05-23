import React, { useState, useEffect} from 'react';
import './style.css';

const UsersDrinks = () => {
    const [drinkData, setDrinkData] = useState([]);
    const [displayArray, setDisplayArray] = useState({});
    const [drinkName, setDrinkName] = useState('');
    const [drinkImgSrc, setDrinkImgSrc] = useState('');
    const [instructions, setInstructions] = useState('');


    const drinkIdUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=`
  
    useEffect(() => {
        (
          async () => {
              let username = localStorage.getItem('username')
              const response = await fetch(`http://localhost:8000/drinks/${username}/`)
              const savedDrinks = await response.json()
              console.log(savedDrinks)
            //   setDrinkData(savedDrinks)
            // drinkData.push(savedDrinks)

          }
        )
        ()
    }, [])

    useEffect(() => {
        fetch(`${drinkIdUrl}17229`)
        .then(resp => resp.json())
        .then(data => {
            setDrinkName(data.drinks[0].strDrink)
            setDrinkImgSrc(data.drinks[0].strDrinkThumb)
            setInstructions(data.drinks[0].strInstructions)
        })
    }, [])

  return (
    <>

       <div className='card-container'>
           <div className='image-container'>
               <img src={drinkImgSrc} alt={drinkName}/>
           </div>
           <div className='card-content'>
                <div className='card-title'>
                    <h3>{drinkName}</h3>
                </div>
                <hr/>
                <div className='card-body'>
                    <p>{instructions}</p>
                </div>
           </div>
       </div>
    </>
  )
}


export default UsersDrinks
