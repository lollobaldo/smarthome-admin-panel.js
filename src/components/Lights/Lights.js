import React from 'react';
import './Lights.scss';

const Lights = () => (
  <div>
    <h1>OFF</h1>
    <div className="slidecontainer">
      <input
        type="range"
        min="1" max="100" value="50"
        className="slider"
        // eslint-disable-next-line no-console
        onChange={() => console.log('ciao')} />
    </div>
  </div>
);

export default Lights;
