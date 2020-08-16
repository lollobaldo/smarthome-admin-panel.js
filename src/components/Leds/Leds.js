import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSpring, animated, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';

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

const Leds = ({ handler, state, effects }) => {
  const minHeight = 120;
  const maxHeight = 300;
  const [{ y }, set] = useSpring(() => ({ y: minHeight }));

  const setHeight = (toOpen, canceled = false, velocity = 0) => {
    // console.log(toOpen ? 'open' : 'close');
    set({
      y: toOpen ? maxHeight : minHeight,
      config: {
        ...canceled ? config.wobbly : config.stiff,
        velocity,
      },
    });
  };

  const bind = useDrag(({
    last, vxvy: [, vy], movement: [, my], cancel,
  }) => {
    const newHeight = -my;
    console.log({ my, vy, newHeight });
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

  return (
    <div className="leds-container">
      <ColorPicker handler={handler} state={state} />
      <animated.div
        className="leds--presets w3-card"
        {...bind()}
        style={{ height: y }}>
        {/* <h2
          onClick={open}
          style={{ width: '100%', textAlign: 'center', marginBottom: 0 }}>
          Effects
        </h2> */}
        {effects.map(({ jump, colors, css }, i) => (
          <div
            onClick={() => handler(colors)}
            key={i}
            className="effect w3-card"
            style={{ backgroundImage: css || colors2css(colors, jump) }}
          ></div>
        ))}
      </animated.div>
    </div>
  );
};

const ColorPicker = ({ handler, state }) => {
  const [dimensions, setDimensions] = React.useState({
    width: 0, height: 0, r: 0,
  });
  const inputRef = useRef(null);
  useEffect(() => {
    setDimensions({
      width: inputRef.current.offsetWidth,
      height: inputRef.current.offsetHeight,
      r: Math.min(inputRef.current.offsetWidth, inputRef.current.offsetHeight) * 0.4,
    });
  }, [inputRef]);
  return (
    <div className='colour-wheel-container' ref={inputRef}>
      {/* Only render if mounted */}
      { dimensions.r && <ColourWheel
          radius={140 || dimensions.r}
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
          animated /> }
    </div>
  );
};

ColorPicker.propTypes = PropTypes.shape({
  handler: PropTypes.func,
  state: PropTypes.bool,
}).isRequired;

Leds.propTypes = PropTypes.shape({
  handler: PropTypes.func,
  state: PropTypes.bool,
  effects: PropTypes.any,
}).isRequired;

export default Leds;
