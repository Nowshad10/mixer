import React from 'react';
import NavigationButton from '../../components/NavigationButton';
import { Outlet } from 'react-router-dom';

const Search = () => {
  return (
    <>
      <NavigationButton buttonName='Search by name' route='search/name'/> 
      <NavigationButton buttonName='Search by ingredients' route='search/ingredient'/>
      <Outlet />
    </>
  )
}

export default Search
