import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import homeBackground from './bluecocktail.png';


const Home = () => {
  const navigate = useNavigate();

  return (
        <header className='wrapper'>
          <div className='video-wrapper'> 
            {/* <video id='video' src='/Videos/homeVideo.mp4' autoPlay loop muted></video> */}
            {/* video files had to be deleted as netlify couldnt handle deployment with it */}
            <img id='video' src={homeBackground} alt='cocktails'/>
          </div>
          <div className='overlay'></div>
            <div className='homeText'>
              <div className='home-text-inner'>  
                <h1 className='wel-mess'>
                  Welcome to Mixer
                </h1>
                <h2 className='wel-mess-2'>
                  Get cocktail recipes for the ingredients you have at home.
                </h2>
                <div className="center-button">
                  <button id='mix-btn' onClick={() => navigate('/search')}>Start mixing now!</button>
                </div>
              </div>
            </div>
        </header>
  )
}

export default Home;
