import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Cards from 'components/Card';

import iconLight from 'res/icons/light.svg';
import iconLeds from 'res/icons/light-rgb.svg';
import iconFan from 'res/icons/fan.svg';
import iconPlant from 'res/icons/plant-potted.svg';
import iconThermometer from 'res/icons/thermometer.svg';


import './Devices.scss';

const { Card } = Cards;

const getLedsDot = (color) => (
  <span style={{
    height: '1.4em',
    width: '1.4em',
    backgroundColor: `${color}`,
    borderRadius: '50%',
    display: 'inline-block',
  }}></span>
);

const Devices = ({ history, state }) => (
  <div className="flex settings">
    <Card name="Light"
      icon={iconLight}
      value={state.lights.floorLamp ? 'ON' : 'OFF'}
      onClick={() => history.push('/lights')} />
    <Card name="Leds"
      icon={iconLeds}
      value={getLedsDot(state.lights.leds)}
      onClick={() => history.push('/leds')} />
    <Card name="Plants"
      icon={iconPlant}
      value=""
      onClick={() => history.push('/plants')} />
    <Card name="Fans" icon={iconFan} value="OFF"/>
    <Card name="Temp" icon={iconThermometer} value="86%"/>
    <Card name="Humidity" icon={iconThermometer} value="86%"/>
  </div>
);

Devices.propTypes = {
  history: PropTypes.any,
  state: PropTypes.any,
};

export default withRouter(Devices);
