import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import ColourWheel from '../ColourWheel';

import './Leds.scss';

const colours = [
  '#00C3A9', '#00B720', '#008813',
  '#000000', '#FFFFFF',
  '#F8E300', '#FF6400', '#E20000',
  '#AC000D', '#9E005F', '#6D0E82',
  '#3B3887', '#175FDA', '#0091E2',
  '#00BCED', '#14E4C5',
];

const Leds = ({ handler, state }) => {
  const [dimensions, setDimensions] = React.useState({
    width: 0, height: 0, r: 0,
  });
  const inputRef = useRef(null);
  useEffect(() => {
    setDimensions({
      width: inputRef.current.offsetWidth,
      height: inputRef.current.offsetHeight,
      r: Math.min(dimensions.width, dimensions.height) * 0.4,
    });
  }, [inputRef.current]);
  return (
    <div className='colour-wheel-container' ref={inputRef}>
      <ColourWheel
        radius={dimensions.r || 200}
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
};

Leds.propTypes = PropTypes.shape({
  handler: PropTypes.func,
  state: PropTypes.bool,
}).isRequired;

export default Leds;
