import React from 'react';
import { Link } from 'react-router-dom';

const DisplayDrinkCard = ({drinks}) => {

  return (
       drinks.map((item) => {
         return (
           <div key={item.idDrink} className='card-container'>
             <Link to={`/drink-info/${item.idDrink}`}>
             <div className='image-container'>
               <img src={item.strDrinkThumb} alt={item.strDrink}/>
             </div>
             <div className='card-content'>
               <div className='card-title'>
                 <h3>{item.strDrink}</h3>
               </div>
             </div>
             </Link>
           </div>
         )
       })
    )
  
}

export default DisplayDrinkCard;
