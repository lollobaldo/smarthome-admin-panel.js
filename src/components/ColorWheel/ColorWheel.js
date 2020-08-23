import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import tinycolor from 'tinycolor2';

import './ColorWheel.scss';

const ColorWheel = ({ state: selectedColor, handler }) => {
  const colors = [
    '#FFFFFF',
    '#F8E300',
    '#FF6400',
    '#E20000',
    '#AC000D',
    '#9E005F',
    '#6D0E82',
    '#3B3887',
    '#175FDA',
    '#0091E2',
    '#00BCED',
    '#14E4C5',
    '#00C3A9',
    '#00B720',
    '#008813',
    '#000000',
  ];
  const width = 500;
  const height = width;
  const outerCircleSize = width / 6;
  const middleCircleSize = width / 8;
  const innerCircleSize = width / 8;
  const padding = width / 36;
  const R = innerCircleSize;
  const rr = innerCircleSize + padding;
  const RR = rr + middleCircleSize;
  const rrr = RR + padding;
  const RRR = rrr + outerCircleSize;
  const { kSpring: kOuterSpring } = useSpring({ kSpring: 1, from: { kSpring: 0 } });
  const { kSpring: kMidddleSpring } = useSpring({ kSpring: 1, from: { kSpring: 0 } });
  const [color, setColor] = useState(selectedColor);

  const changeColor = (newColor) => {
    // kMidddleSpring.reset();
    setColor(newColor);
    handler(newColor);
  };

  const getShades = (hex) => {
    const shades = [];
    const hsl = tinycolor(hex).toHsl();
    const k = 0.8 / colors.length;
    for (let i = 0.9; i >= 0.1; i -= k) {
      hsl.l = i;
      shades.push(tinycolor(hsl).toHexString());
    }
    return shades;
  };

  const InnerCircle = () => (
    <circle
      cx={width / 2} cy={height / 2} r={R}
      fill={color} />);

  const MiddleRing = () => {
    useEffect(
      () => {
        kMidddleSpring.reset();
      }, [color],
    );
    return (
      <Ring
        cx={width / 2} cy={height / 2}
        R={RR} r={rr} colors={getShades(color)}
        kSpring={kMidddleSpring} onColorSelect={changeColor} />
    );
  };

  const OuterRing = () => (
    <Ring
      cx={width / 2} cy={height / 2}
      R={RRR} r={rrr} colors={colors}
      kSpring={kOuterSpring} onColorSelect={changeColor} />);

  return (
    <svg key={color}
      width={width}
      height={height}>
      {color && <InnerCircle />}
      {color && <MiddleRing />}
      <OuterRing />
    </svg>
  );
};

const Ring = ({
  cx, cy, R, r, colors, kSpring, onColorSelect,
}) => (
  colors.map((c, i) => (
    <animated.path
      key={c}
      style={{ fill: c }}
      onClick={() => onColorSelect(c)}
      d={kSpring.interpolate((k) => {
        const n = colors.length;
        const a = -(2 * Math.PI) / n;
        const alpha = k * a * i - Math.PI;
        const alphap = k * a * (i + 1) - Math.PI;
        return (`
        M ${(cx) - R * (Math.sin(alpha))},
          ${(cy) - R * (Math.cos(alpha))}
        A ${R}, ${R}, 0, 0, 1,
          ${(cx) - R * (Math.sin(alphap))}
          ${(cy) - R * (Math.cos(alphap))}
        L ${(cx) - r * (Math.sin(alphap))},
          ${(cy) - r * (Math.cos(alphap))}
        A ${r}, ${r}, 0, 0, 0,
          ${(cx) - r * (Math.sin(alpha))}
          ${(cy) - r * (Math.cos(alpha))}
        z
        `);
      })} />
  ))
);

Ring.propTypes = PropTypes.shape({
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  kSpring: PropTypes.any,
  onColorSelect: PropTypes.func.isRequired,
}).isRequired;

ColorWheel.propTypes = PropTypes.shape({
}).isRequired;

export default ColorWheel;
