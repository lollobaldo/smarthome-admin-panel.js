import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Cards from 'components/Card';

import iconLight from 'res/icons/light.svg';
import iconLeds from 'res/icons/color-wheel.svg';
// import iconLeds from 'res/icons/light-rgb.svg';
import iconFan from 'res/icons/fan.svg';
import iconPlant from 'res/icons/plant-potted.svg';
import iconThermometer from 'res/icons/thermometer.svg';

import iconOk from 'res/icons/ok-2.svg';

import './Devices.scss';

const { Card } = Cards;

const getLightSwitch = (state, handler) => (
  <label className="switch" onClick={(e) => e.stopPropagation()}>
    <input type="checkbox"
      checked={state}
      onChange={() => { console.log('called'); handler(); }} />
    <span className="slider round"></span>
  </label>
);

const getLedsDot = (color) => (
  <span style={{
    height: '1.4em',
    width: '1.4em',
    backgroundColor: `${color}`,
    borderRadius: '50%',
    display: 'inline-block',
  }}></span>
);

const getPlantsIcon = () => (
  <img src={iconOk} style={{
    height: '1.4em',
    width: '1.4em',
    verticalAlign: 'top',
  }}></img>
);

const Devices = ({ history, state, onLightSwitch }) => (
  <div className="Devices flex settings">
    <Card name="Light"
      icon={iconLight}
      value={getLightSwitch(state.lights.floorlamp, onLightSwitch)}
      onClick={() => history.push('/lights')} />
    <Card name="Leds"
      icon={iconLeds}
      value={getLedsDot(state.lights.leds)}
      onClick={() => history.push('/leds')} />
    <Card name="Plants"
      icon={iconPlant}
      value={getPlantsIcon()}
      onClick={() => history.push('/plants')} />
    <Card name="Fans" icon={iconFan} value="OFF"/>
    <Card name="Temp" icon={iconThermometer} value="86%"/>
    <Card name="Humidity" icon={iconThermometer} value="86%"/>
  </div>
);

Devices.propTypes = {
  history: PropTypes.any,
  state: PropTypes.any,
  onLightSwitch: PropTypes.func,
};

export default withRouter(Devices);
