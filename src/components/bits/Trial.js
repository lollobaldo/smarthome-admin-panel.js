import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { clamp } from 'utils';

// const Styles = styled.div`
// `;

// 2700 - 6500 K
const k2rgb = (t) => {
  const temperature = t / 100;

  let red = 255;
  if (temperature > 66) {
    red = temperature - 60;
    red = 329.698727466 * red ** -0.1332047592;
  }
  red = clamp(red, 0, 255);

  let green;
  if (temperature <= 66) {
    green = temperature;
    green = (99.4708025861 * Math.log(green)) - 161.1195681661;
  } else {
    green = temperature - 60;
    green = 288.1221695283 * green ** -0.0755148492;
  }
  green = clamp(green, 0, 255);

  let blue = 255;
  if (temperature < 65) {
    if (temperature <= 19) {
      blue = 0;
    } else {
      blue = temperature - 10;
      blue = (138.5177312231 * Math.log(blue)) - 305.0447927307;
    }
  }
  blue = clamp(blue, 0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

const Trial = () => {
  const [temp, setTemp] = useState(2700);

  return (
    <div
      className="w3-display-middle w3-round"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: k2rgb(temp) }}>
      CACCA
    </div>
  );
};

Trial.propTypes = {
};

export default Trial;
