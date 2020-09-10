import React from 'react';
import PropTypes from 'prop-types';

import './Home.scss';

import Presets from './Presets';
import Devices from './Devices';

const Home = ({
  presets, activePreset, onPresectSelect, state, onLightSwitch,
}) => (
  <div className="body">
    <h3>Presets</h3>
    <Presets
      presets={presets}
      activePreset={activePreset}
      onPresectSelect={onPresectSelect} />
    <h3>Settings</h3>
    <Devices state={state} onLightSwitch={onLightSwitch} />
  </div>
);

Home.propTypes = {
  presets: PropTypes.array,
  activePreset: PropTypes.number.isRequired,
  onPresectSelect: PropTypes.func.isRequired,
  state: PropTypes.any,
  onLightSwitch: PropTypes.func,
};

export default Home;
