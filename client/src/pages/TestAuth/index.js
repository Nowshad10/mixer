import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../../components/NavigationButton';

const TestAuth = () => {
    const navigate = useNavigate()
    let username = localStorage.getItem('username')

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
    }, [navigate])
  return (
    <>
        <h2>Welcome {username}!</h2>
        <NavigationButton buttonName='View Your Saved Drinks' route='saved-drinks'/>
        <NavigationButton buttonName='Search For Drinks' route='search'/>
    </>
  )
}

export default TestAuth;
