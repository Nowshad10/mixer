import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
    // else if (token.detail) {
    //   alert('Incorrect username/password')
    // }
    else {
      alert('Incorrect username/password')
    }
  }

  if (redirect) {
    return navigate('/auth')
  }


  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Enter Username</label>
            <input required type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}></input>

            <label htmlFor='password'>Enter Password</label>
            <input required type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)}></input>

            <input type="submit" value="sign in!"></input>
        </form>
    </>
  )
}

export default Login;
