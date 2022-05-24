import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate  } from 'react-router-dom';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes, FaCocktail  } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick2 = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

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
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
              <NavLink to="/" className='nav-links' onClick={closeMobileMenu}>Home</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/searchbyname' className='nav-links'
                  onClick={closeMobileMenu}>Search By Name</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/popular" className='nav-links'
                  onClick={closeMobileMenu}>Popular Drinks</NavLink>
          </li>  
          <li className='nav-item'>
            <NavLink to="/register" className='nav-links'
                  onClick={closeMobileMenu}>Register</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/login" className='nav-links'
                  onClick={closeMobileMenu}>Login</NavLink>
          </li>
        </ul>
      </>
    )
  } else if (username) {
    console.log(`username verified: ${username}`)
    navigation = (
      <>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'><NavLink to="/" className='nav-links'
                  onClick={closeMobileMenu}>Home</NavLink>
          </li>
          <li className='nav-item'><NavLink to='/login' onClick={handleClick} className='nav-links'
                  onClick={closeMobileMenu}>Logout</NavLink>
          </li>
          <li className='nav-item'><NavLink to="/saved-drinks" className='nav-links'
                  onClick={closeMobileMenu}>Your Saved Drinks</NavLink>
          </li>
          <li className='nav-item'><NavLink to="/popular" className='nav-links'
                  onClick={closeMobileMenu}>Popular Drinks</NavLink>
          </li>
          <li className='nav-item'><NavLink to='/searchbyname' className='nav-links'
                  onClick={closeMobileMenu}>Search By Name</NavLink>
          </li>
        </ul>
      </>
    )
  }
 

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick=     {closeMobileMenu}>
              <FaCocktail className='navbar-icon' />
              MIXER
            </Link>
            <div className='menu-icon' onClick={handleClick2}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
              {navigation}
            
          </div>
        </nav>
      </IconContext.Provider>  
    </>
  )
}

export default Navbar;
