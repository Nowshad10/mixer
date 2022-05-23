import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

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
  return (
    <>
        <h2>Welcome {username}!</h2>
    </>
  )
}

export default TestAuth;
