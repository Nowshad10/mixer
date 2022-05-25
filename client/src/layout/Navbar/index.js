import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate  } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClick = () => {
    localStorage.clear()
    dispatch({
      type: 'RESET'
    })
    navigate('/')
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
        <NavLink to='/searchbyname'>Search By Name</NavLink>
        <NavLink to='/ingredientsearch'>Ingredient Search</NavLink>
        <NavLink to="/popular">Popular</NavLink>
        <NavLink to="/random">Random</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </>
    )
  } else if (username) {
    console.log(`username verified: ${username}`)
    navigation = (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to='/searchbyname'>Search By Name</NavLink>
        <NavLink to='/ingredientsearch'>Ingredient Search</NavLink>
        <NavLink to="/popular">Popular</NavLink>
        <NavLink to="/random">Random</NavLink>
        <NavLink to="/saved-drinks">Saved Drinks</NavLink>
        <NavLink to='/login' onClick={handleClick}>Logout</NavLink>
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
