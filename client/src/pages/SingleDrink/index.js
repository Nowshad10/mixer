import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
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
      fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${drinkId}`)
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
<div className='center'>
    <div className='iDrink'>
        <div className="button-container">
            <h1 className='sd-h1'>{drinkName}</h1>
            <BackButton />
        </div>
        
            <div className='centerimg'>
                <div className="grid-col">
                    <img className='sd-img' src={drinkImage} alt={drinkName} style={{ width:"300px", height:'auto'}}/>  
                </div>
                <div className="grid-col">
                    <h3 className='sd-h3'>Ingredients</h3>
                    <div className='gridIng'>
                        <div className='gridIngCol'>
                                { ingredientArr.map((i, idx) =>  {return (
                                <p key={idx}>{i}</p>
                            )
                            })}
                        </div>
                        <div className='gridIngCol'>
                                { measuresArr.map((i, idx) => {return (
                                <p key={idx} className='measures'>{i}</p>
                            )})}
                        </div>         
                    </div>
                </div>
                    
            </div>
                
                
           
        <div>
                <h3 className='inst-h3'>Instructions</h3>
                <p className='instruction-text'>{instructions}</p>
                { username &&    
                <SaveButton drinkId={drinkId} drinkName={drinkName} drinkImage={drinkImage} instructions={instructions}/>
                }
                { !username &&
                
                <a href='/login' className='login-text'>Log in to save drinks</a>
                }
            </div>
       
        
    </div>
</div>
  )
}

export default SingleDrink;
