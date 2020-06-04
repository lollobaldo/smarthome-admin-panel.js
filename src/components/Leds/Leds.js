import React from 'react';
import PropTypes from 'prop-types';

import ColourWheel from '../ColourWheel';

import './Leds.scss';

// import { crossTrice } from '../../utils';

const colours = [
  '#00C3A9', '#00B720', '#008813',
  '#000000', '#FFFFFF',
  '#F8E300', '#FF6400', '#E20000',
  '#AC000D', '#9E005F', '#6D0E82',
  '#3B3887', '#175FDA', '#0091E2',
  '#00BCED', '#14E4C5',
];

const Leds = ({ handler, state }) => (
  <div className='colour-wheel-container'>
    <ColourWheel
      radius={window.innerWidth * 0.4}
      padding={10}
      lineWidth={50}
      onColourSelected={handler}
      spacers={{
        colour: '#FFFFFF',
        // shadowColour: 'grey',
        // shadowBlur: 5,
      }}
      colour={state}
      colours={colours}
      animated />
  </div>
);

Leds.propTypes = PropTypes.shape({
  handler: PropTypes.func,
  state: PropTypes.bool,
}).isRequired;

export default Leds;
