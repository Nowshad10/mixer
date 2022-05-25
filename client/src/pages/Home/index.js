import React from 'react';
import './index.css';


const Home = () => {

  return (
        <header className='wrapper'>
          <div className='video-wrapper'> 
            <video id='video' src='/Videos/homeVideo.mp4' autoPlay loop muted></video>
          </div>
          <div className='overlay'></div>
            <div className='homeText'>
              <div className='homeText-inner'>  
                <h1 className='wel-mess'>
                  Welcome to Mixer
                </h1>
                <h2 className='wel-mess-2'>
                  Find out what drinks you can make with ingredients you have at home.
                </h2>
              </div>
              {/* <div>
              <button class="btn-general"><span>Get Drinking!</span></button>
              </div> */}
            </div>
        </header>
  )
}

export default Home;
