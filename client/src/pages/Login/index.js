import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './style.css';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const responseToken = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      body: JSON.stringify({username: username, password: password}),
      headers: {'Content-Type': 'application/json'}
    })
    const token = await responseToken.json()
    localStorage.setItem('jwt', token.jwt)

    if(token.jwt) {
      const responseAuth = await fetch('http://localhost:8000/api/auth/', {
        method: 'POST',
        body: JSON.stringify({ token: token.jwt }),
        headers: {'Content-Type': 'application/json'}
      })
      const content = await responseAuth.json()
      localStorage.setItem('username', content.username)
      dispatch({
        type: "SET_USERNAME",
        value: content.username
      })
      setRedirect(true)
    }
    else {
      alert('Incorrect username/password')
    }
  }

  if (redirect) {
    return navigate('/auth')
  }


  return (
    <>
        <div className='center'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>

            <div className='txt_field'>
              <input id='username' onChange={(e) => setUsername(e.target.value)} type='text' name='username' required/>
              <span></span>
              <label htmlFor='username'>Username</label>
            </div>

            <div className='txt_field'>
              <input id='password' onChange={(e) => setPassword(e.target.value)} type='password' name='password' required/>
              <span></span>
              <label htmlFor='password'>Password</label>
            </div>

            <input id='login-btn' type='submit' value='Login'></input>
            <div className='signup_link'>
                Not registered? <a href='/register'>Sign Up</a>
            </div>

          </form>
        </div>
    </>
  )
}

export default Login;
