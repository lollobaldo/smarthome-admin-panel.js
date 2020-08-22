import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSpring, animated, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';

import ColorWheel from '../ColorWheel';

import './Leds.scss';

const colours = [
  '#00C3A9', '#00B720', '#008813',
  '#000000', '#FFFFFF',
  '#F8E300', '#FF6400', '#E20000',
  '#AC000D', '#9E005F', '#6D0E82',
  '#3B3887', '#175FDA', '#0091E2',
  '#00BCED', '#14E4C5',
];

const colors2css = (colors, jump) => {
  let cs;
  if (jump) {
    const k = 100 / colors.length;
    cs = colors.map((curr, idx) => (
      `${curr} ${Math.round(k * idx)}%, ${curr} ${Math.round(k * (idx + 1))}%`
    )).join();
  }
  return `linear-gradient(to right, ${cs || colors.join()})`;
};

const Leds = ({ handler, state, effects }) => (
  <div className="leds-container">
    <ColorWheel handler={handler} state={state} />
    {/* <ColorPicker handler={handler} state={state} /> */}
    <Effects effects={effects} handler={handler} />
  </div>
);

const Effects = ({ effects, handler }) => {
  const minHeight = 120;
  const maxHeight = 300;
  const [{ y }, set] = useSpring(() => ({ y: minHeight }));

  const setHeight = (toOpen, canceled = false, velocity = 0) => {
    // console.log(toOpen ? 'open' : 'close');
    set({
      y: toOpen ? maxHeight : minHeight,
      config: {
        ...canceled ? config.wobbly : config.default,
        velocity,
      },
    });
  };

  const bind = useDrag(({
    last, vxvy: [, vy], movement: [, my], cancel,
  }) => {
    const newHeight = -my;
    // console.log({ my, vy, newHeight });
    if (newHeight > maxHeight || newHeight < minHeight) {
      cancel();
      setHeight(newHeight > maxHeight, true);
      return;
    }
    if (last) {
      // console.log('last');
      if (newHeight > maxHeight * 0.8 || vy < -1) {
        setHeight(true, false, vy);
      } else {
        setHeight(false, false, vy);
      }
    } else {
      set({ y: newHeight, immediate: false, config: config.stiff });
    }
  }, {
    initial: () => [0, -y.get()],
    axis: 'y',
    filterTaps: true,
  });

  const [speed, setSpeed] = useState(1000);

  return (
    <animated.div
      className="leds--presets w3-card"
      {...bind()}
      style={{ height: y }}>
      {/* <h2
        onClick={open}
        style={{ width: '100%', textAlign: 'center', marginBottom: 0 }}>
        Effects
      </h2> */}
      {/* <p>
        <label htmlFor="speed">Speed</label> */}
        <input type="range" id="speed" name="speed"
          min="100" max="5000" step="10"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)} />
      {/* </p> */}
      {effects.map(({ jump, colors, css }, i) => (
        <div
          onClick={() => handler(colors)}
          key={i}
          className="effect w3-card"
          style={{ backgroundImage: css || colors2css(colors, jump) }}
        ></div>
      ))}
    </animated.div>
  );
};

Effects.propTypes = PropTypes.shape({
  handler: PropTypes.func,
  effects: PropTypes.any,
}).isRequired;

Leds.propTypes = PropTypes.shape({
  handler: PropTypes.func,
  state: PropTypes.bool,
  effects: PropTypes.any,
}).isRequired;

export default Leds;
