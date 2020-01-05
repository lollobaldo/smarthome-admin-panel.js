import React, { useState } from 'react';
import './Lights.scss';
import Bulb from './Bulb';


import bulbON from '../../res/icons/icons8-light-on-96.png';
import bulbOFF from '../../res/icons/icons8-light-off-96.png';


const Lights = () => {
  const [state, setState] = useState(true);
  const handleChange = event => setState(event.target.value>50);
  return(
    <div
      className={state ? 'active' : ''}
      style={{
        'display': 'flex',
        'justifyContent': 'space-evenly',
        'alignItems': 'center',
        'flexDirection': 'column',
        'height': '100%'}}>

      {/* <Bulb state={state} onClick={() => alert('change')} /> */}
      <div className='bg-yellow'></div>
      <Bulb state={state} onClick={() => setState(!state)} />
      {/* <img src={state ? bulbON : bulbOFF} onClick={() => setState(!state)} /> */}
      {/* <div className="slider-container">
        <input
          type="range"
          min="1" max="100"
          className="slider"
          value={state ? 100 : 0}
          onChange={handleChange} />
      </div> */}
      <h1>{state ? 'ON' : 'OFF'}</h1>
    </div>
  )
};

export default Lights;
