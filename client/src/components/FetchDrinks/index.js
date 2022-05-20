import React, {useState, useEffect} from 'react'
import './style.css'

const FetchApi = (url) => {
    const [data, setData] = useState([]);
    url = 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php'

    const fetchDrinks = async () => {
        const response = await fetch(url)
        const result = await response.json()
        // console.log(result)
        setData(result.drinks)
    }

    useEffect(() => {
        fetchDrinks()
    }, [])

   

  return(
    data.map(drink => {

        const {strDrink, strDrinkThumb, strGlass, strAlcoholic, strInstructions} = drink

        // Gather the ingredients for each drink
        const ingArray = Object.entries(drink)
        const ingFilter = ingArray.filter(x => x[0].includes('strIngredient') && x[1] !== null) 
        // console.log(ingFilter)

        // Gather the measures for each drink
        let measuresArray = Object.entries(drink)
        const mesFilter = measuresArray.filter(x => x[0].includes('strMeasure') && x[1] !== null)
        console.log(mesFilter)

        return ( 
           <div className="drink-card">              
                <div className="drink-img">
                    <h2>{strDrink}</h2>
                    <img src={strDrinkThumb} alt={strDrink} className="drink-thumb"/>
                </div>
                <div className="drink-info">
                    <p>{strGlass}</p>
                    <p>{strAlcoholic}</p>
                    <p>{strInstructions}</p>

                <div className="grid">
                    {ingFilter.map(ing => {
                            return (
                                <p className="left">{ing[1]}</p>
                                
                            )
                        })}

                    {mesFilter.map(mes => {
                        return (
                            <p className="right">{mes[1]}</p>
                        )
                    })}
                </div>
                       
                                                     
                </div>  
            </div>
        )
    })
  )  
    
      
}

export default FetchApi
