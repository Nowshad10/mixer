import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    localStorage.clear()
    dispatch({
      type: 'RESET'
    })
    window.location.reload()
  }
  let navigation;
  let username;
  const usernameRedux = useSelector(state => state.username)
  if (usernameRedux) {
    username = usernameRedux
  } else {
    username = localStorage.getItem('username')
  }

  if (username === null || username === '' || username === undefined) {
    navigation = (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </>
    )
  } else if (username) {
    console.log(`username verified: ${username}`)
    navigation = (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to='/login' onClick={handleClick}>Logout</NavLink>
        <NavLink to="/saved-drinks">Your Saved Drinks</NavLink>
      </>
    )
  }
  return (
    <nav>
        {navigation}
    </nav>
  )
}

export default Navbar;
