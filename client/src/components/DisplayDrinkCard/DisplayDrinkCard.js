import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const DisplayDrinkCard = ({drinks}) => {
  return (
       drinks.map((item) => {
         console.log('drink rendered')
         return (
           <div className='grid-container centeritem'>
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
          </div>
         )
       })
    )
  
}

export default DisplayDrinkCard;
