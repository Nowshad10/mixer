import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault()
      const options = {
          method: 'POST',
          body: JSON.stringify({username: username, password: password, password_confirmation: confirmPass}),
          headers: {'Content-Type': 'application/json'}
      }
      await fetch('http://127.0.0.1:8000/api/register/', options)
      setRedirect(true)
  }

  if (redirect) {
    return navigate('/login')
  }
  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Enter Username</label>
            <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}></input>

            <label htmlFor='password'>Enter Password</label>
            <input type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)}></input>

            <label htmlFor='confirm-password'>Confirm Password</label>
            <input type="password" id='confirm-password' name='confirm-password' onChange={(e) => setConfirmPass(e.target.value)}></input>

            <input type="submit" value="sign up!"></input>
        </form>
    </>
  )
}

export default Register;
