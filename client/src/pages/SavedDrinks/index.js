import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersDrinks from '../../components/UsersDrinks';

const SavedDrinks = () => {

    const [id, setId] = useState('');
    const [drinkName, setDrinkName] = useState('');
    const [drinkImage, setDrinkImage] = useState('');
    const [drinkInstructions, setDrinkInstructions] = useState('');
    const [data, setData] = useState(null);
    

    const navigate = useNavigate()

    useEffect(() => {
        (
            async () => {
                if (!localStorage.getItem('jwt')) {
                    localStorage.clear()
                    navigate('/login')
                } else {
                    const token = localStorage.getItem('jwt')
                    const options = {
                        method: 'POST',
                        body: JSON.stringify({ token: token }),
                        headers: {'Content-Type': 'application/json'}
                    }
                    const response = await fetch('https://mixer-server.herokuapp.com/api/auth/', options)
                    if (response.status === 500) {
                        localStorage.clear()
                        navigate('/login')
                    }
                }
                
            }
        )
        ()
    }, [])
    
//   const handleSubmitDrink = async (e) => {
//       e.preventDefault()
//       let username = localStorage.getItem('username')
//       const options = {
//           method: 'POST',
//           body: JSON.stringify({id_drink: id, username: username, drink_name: drinkName, drink_image: drinkImage, drink_instructions: drinkInstructions}),
//           headers: {'Content-Type': 'application/json'}, withCredentials: true
//       }
//       await fetch(`http://localhost:8000/drinks/${username}/`, options)
//       e.target.drinkId.value = ""
      
//   }

  useEffect(() => {
    let username = localStorage.getItem('username')
    fetch(`https://mixer-server.herokuapp.com/drinks/${username}/`)
    .then(response => response.json())
    .then(data => {
        setData(data)
    })
  }, [])

    
  return (
    <>
        {/* <form onSubmit={handleSubmitDrink}>
            <label htmlFor='drinkId'>Drink ID</label>
            <input name='drinkId' type='number' id='drinkId' onChange={(e) => setId(e.target.value)}/>

            <label htmlFor='drinkName'>Drink Name</label>
            <input name='drinkName' type='text' id='drinkName' onChange={(e) => setDrinkName(e.target.value)}/>

            <label htmlFor='drinkImage'>Drink Image</label>
            <input name='drinkImage' type='text' id='drinkImage' onChange={(e) => setDrinkImage(e.target.value)}/>

            <label htmlFor='drinkInstructions'>Drink Instructions</label>
            <input name='drinkInstructions' type='text' id='drinkInstructions' onChange={(e) => setDrinkInstructions(e.target.value)}/>



            <input type='submit' value='Save Drink'/>
        </form> */}

        { data && <UsersDrinks drinks={data}/> }
        
    </>
  )
}

export default SavedDrinks
