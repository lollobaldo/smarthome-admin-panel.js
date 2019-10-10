import React, { useState } from 'react';
import './Lights.scss';


import bulbON from '../../res/icons/icons8-light-on-96.png';
import bulbOFF from '../../res/icons/icons8-light-off-96.png';


const Lights = () => {
  const [state, setState] = useState(true);
  const handleChange = event => setState(event.target.value>50);
  return(
    <div style={{
      'display': 'flex',
      'justify-content': 'space-evenly',
      'align-items': 'center',
      'flex-direction': 'column',
      'height': '100%'}}>
      <img src={state ? bulbON : bulbOFF} onClick={() => setState(!state)} />
      <div className="slider-container">
        <input
          type="range"
          min="1" max="100" defaultValue="100"
          className="slider"
          onChange={handleChange} />
      </div>
      <h1>{state ? 'ON' : 'OFF'}</h1>
    </div>
  )
};

export default Lights;
