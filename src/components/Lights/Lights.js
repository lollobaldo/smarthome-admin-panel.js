import React from 'react';
import PropTypes from 'prop-types';

import './Lights.scss';
import Bulb from './Bulb';

const Lights = ({ handler, state }) => (
  <div
    className={state ? 'active' : ''}
    style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    }}>
    <div className='bg-yellow'></div>
    <Bulb state={state} onClick={handler} />
  </div>
);

Lights.propTypes = {
  handler: PropTypes.func,
  state: PropTypes.bool,
};

export default Lights;
