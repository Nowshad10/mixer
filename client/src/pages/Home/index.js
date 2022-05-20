import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {

  const username = useSelector(state => state.username)

  return (
        <div>Welcome to Mixer</div>
  )
}

export default Home;
