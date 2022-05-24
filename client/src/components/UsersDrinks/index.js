import React from 'react';
import './style.css';

const UsersDrinks = ({drinks}) => {


    // const drinkIdUrl = `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=`

  return (
       drinks.map((item) => {
         return (
           <div className='card-container'>
             <div className='image-container'>
               <img src={item.drink_image} alt={item.drink_name}/>
             </div>
             <div className='card-content'>
               <div className='card-title'>
                 <h3>{item.drink_name}</h3>
               </div>
               <hr/>
               <div className='card-body'>
                 <p>{item.drink_instructions}</p>
               </div>
             </div>
           </div>
         )
       })
    )
  
}


export default UsersDrinks
