import React from 'react';
// import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faLightbulb,
  faThermometerHalf,
  faTint,
  faSeedling,
  faTree,
  faFan,
  faHome,
  faSquareFull,
  faHeart,
  faFilm,
  faMoon } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { presets } from '../constants';
import './Main.scss';
import Header from './Header';
import Body from './Body';

library.add(
  faUserCircle,
  faLightbulb,
  faThermometerHalf,
  faTint,
  faSeedling,
  faTree,
  faFan,
  faHome,
  faSquareFull,
  faHeart,
  fasHeart,
  faFilm,
  faMoon);

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    const defState = {
      presets,
      activePreset: -1,
      name: 'Lorenzo'
    };
    this.state = defState;
  }

  onPresectSelect(i) {
    const { activePreset } = this.state;
    this.setState({activePreset: i === activePreset ? -1 : i});
  }

  render() {
    const { presets, activePreset, name } = this.state;
    return (
      <div>
        {/* <FontAwesomeIcon icon="home"
          size="9x"
          mask="square-full"
          style={{
            background: 'linear-gradient(180deg, #0052d4, #4364f7, #6fb1fc);'
          }} /> */}
        <Header name={name} />
        <Body
          presets={presets}
          activePreset={activePreset}
          onPresectSelect={(i) => this.onPresectSelect(i)} />
      </div>
    );
  }
}
