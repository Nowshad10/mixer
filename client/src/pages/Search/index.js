import React from 'react';
import NavigationButton from '../../components/NavigationButton';
import { Outlet } from 'react-router-dom';
import './style.css';

const Search = () => {
  return (
    <>
      <div >
        <div className='center-flex'>
          <NavigationButton buttonName='Search by name' route='search/name' id='search-button'/> 
          <NavigationButton buttonName='Search by ingredients' route='search/ingredient' id='search-ing'/>
          </div>
          <Outlet />
        
      </div>
        
      
    </>
  )
}

export default Search
