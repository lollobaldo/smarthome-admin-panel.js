import React, { useState } from 'react';
import './Lights.scss';
import Bulb from './Bulb';


// import bulbON from '../../res/icons/icons8-light-on-96.png';
// import bulbOFF from '../../res/icons/icons8-light-off-96.png';

import { safePublish } from '../../utils/mqtt';

const Lights = () => {
  const [state, setState] = useState(true);

  const switchLight = () => {
    console.log('light switched');
    // console.log(publish);
    // console.log(safePublish);
    setState(!state);
    safePublish(
      'lights/floorlamp',
      state ? 'ON' : 'OFF'
    );
  };

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
      <Bulb state={state} onClick={switchLight} />
      {/* <img src={state ? bulbON : bulbOFF} onClick={() => setState(!state)} /> */}
      {/* <div className="slider-container">
        <input
          type="range"
          min="1" max="100"
          className="slider"
          value={state ? 100 : 0}
          onChange={handleChange} />
      </div> */}
      {/* <h1>{state ? 'ON' : 'OFF'}</h1> */}
    </div>
  )
};

export default Lights;
