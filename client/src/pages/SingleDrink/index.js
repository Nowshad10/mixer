import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SaveButton from '../../components/SaveButton';

const SingleDrink = () => {
  const [drinkName, setDrinkName] = useState('');
  const [drinkImage, setDrinkImage] = useState('');
  const [instructions, setInstructions] = useState(''); 
  
  useEffect(() => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => {
          if (!response.ok) {
              throw Error('Could not fetch drink')
          }
          return response.json()
      })
      .then(data => {
        //   console.log(data.drinks[0])
          setDrinkName(data.drinks[0].strDrink)
          setDrinkImage(data.drinks[0].strDrinkThumb)
          setInstructions(data.drinks[0].strInstructions)
      })
  })  
  const { id } = useParams();

  return (
    <div>
        <h1>{drinkName}</h1>
        <div>
            <h3>Ingredients</h3>
            <p>Ingredients with measures go here!</p>
        </div>
        <div>
            <h3>Instructions</h3>
            <p>{instructions}</p>
        </div>
        <img src={drinkImage} alt={drinkName} style={{ width:"300px", height:'auto'}}/>
        <SaveButton id={id} drinkName={drinkName} drinkImage={drinkImage} instructions={instructions}/>
    </div>
  )
}

export default SingleDrink;
