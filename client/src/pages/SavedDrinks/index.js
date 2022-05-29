import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersDrinks from '../../components/UsersDrinks';

const SavedDrinks = () => {

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
        <div className='grid-container'> 
            { data && <UsersDrinks drinks={data}/> }
        </div>
    </>
  )
}

export default SavedDrinks
