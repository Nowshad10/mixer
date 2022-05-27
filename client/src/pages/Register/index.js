import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

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
      await fetch('https://mixer-server.herokuapp.com/api/register/', options)
      setRedirect(true)
  }

  if (redirect) {
    return navigate('/login')
  }
  return (
    <>
      <div className='center-login'>
          <h1 className='logintitle'>Register</h1>
          <form onSubmit={handleSubmit}>

          <div className='txt_field'>
            <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" required/>
            <span></span>
            <label htmlFor='username'>Enter Username</label>
          </div>

          <div className='txt_field'>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name='password'required/>
            <span></span>
            <label htmlFor='password'>Enter Password</label>
          </div>

          <div className='txt_field'>
            <input onChange={(e) => setConfirmPass(e.target.value)} type="password" name='confirm-password' required/>
            <span></span>
            <label htmlFor='confirm-password'>Confirm Password</label>
          </div>
          
            <input className='login-btn' type="submit" value="Sign up"></input>
            <div className='signup_link'>
                Have an account? <a href='/login'> Login</a>
            </div>
          
        </form>
      </div>
    </>
  )
}

export default Register;
