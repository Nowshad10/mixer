import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersDrinks from '../../components/UsersDrinks';

const SavedDrinks = () => {

    const [id, setId] = useState('');
    const [drinkData, setDrinkData] = useState([]);
    const [apiDrinkData, setApiDrinkData] = useState([]);

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
                    const response = await fetch('http://localhost:8000/api/auth/', options)
                    if (response.status === 500) {
                        localStorage.clear()
                        navigate('/login')
                    }
                }
                
            }
        )
        ()
    }, [])
    
  const handleSubmitDrink = async (e) => {
      e.preventDefault()
      let username = localStorage.getItem('username')
      const options = {
          method: 'POST',
          body: JSON.stringify({id_drink: id, username: username}),
          headers: {'Content-Type': 'application/json'}, withCredentials: true
      }
      await fetch(`http://localhost:8000/drinks/${username}/`, options)
      e.target.drinkId.value = ""
      
  }

    
  return (
    <>
        <form onSubmit={handleSubmitDrink}>
            <label htmlFor='drinkId'>Drink ID</label>
            <input name='drinkId' type='number' id='drinkId' onChange={(e) => setId(e.target.value)}/>

            <input type='submit' value='Save Drink'/>
        </form>

        <UsersDrinks/>
        
    </>
  )
}

export default SavedDrinks
