import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchApi from '../../components/FetchDrinks';
import SaveButton from '../../components/SaveButton';
import './style.css';

const SingleDrink = () => {
  const [drinkName, setDrinkName] = useState('');
  const [drinkImage, setDrinkImage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientArr, setIngredientArr] = useState([]);
  const [measuresArr, setMeasuresArr] = useState([]);
  const [signedIn, setSignedIn] = useState(false)

  let username = localStorage.getItem('username')

  
  useEffect(() => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
      .then(response => {
          if (!response.ok) {
              throw Error('Could not fetch drink')
          }
          return response.json()
      })
      .then(data => {
          console.log(data.drinks[0])
          setDrinkName(data.drinks[0].strDrink)
          setDrinkImage(data.drinks[0].strDrinkThumb)
          setInstructions(data.drinks[0].strInstructions)
          for (let i=1; i<=15; i++) {
              if (data.drinks[0][`strIngredient${i}`] !== null) {
                  setIngredientArr((prevState) => [...prevState, data.drinks[0][`strIngredient${i}`]])
              } 
          }
          for (let i=1; i<=15; i++) {
            if (data.drinks[0][`strMeasure${i}`] !== null) {
                setMeasuresArr((prevState) => [...prevState, data.drinks[0][`strMeasure${i}`]])
            } 
        }

        
      })
  }, [])

  

  
  
  const { drinkId } = useParams();

  return (
    <div className='iDrink'>
        <h1>{drinkName}</h1>
            <div className='centerimg'>
                    <img src={drinkImage} alt={drinkName} style={{ width:"300px", height:'auto'}}/>
                </div>
                <h3>Ingredients</h3>
                
                <div className='gridIng'>
                    <div className='gridIngCol'>
                        { ingredientArr.map((i, idx) =>  {return (
                        <p key={idx} className='right'>{i}</p>
                    )
                    })}
                </div>
                <div className='gridIngCol'>
                        { measuresArr.map((i, idx) => {return (
                        <p key={idx} className='left'>{i}</p>
                    )})}
                </div>
            
        </div>
        <div>
                <h3 className='instruction'>Instructions</h3>
                <p className='beforeaheader'>{instructions}</p>
                { username &&    
                <SaveButton drinkId={drinkId} drinkName={drinkName} drinkImage={drinkImage} instructions={instructions}/>
                }
                { !username &&
                <p className='drink-text'>Log in to save drinks</p>
                }
            </div>
       
        
    </div>
  )
}

export default SingleDrink;
