import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

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
  faMoon,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faHeart as fasHeart, faLightbulb as fasLightBulb } from '@fortawesome/free-regular-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line import/no-unresolved
import plantDetails from 'src/plantsDetails';

import { presets } from '../constants';
import './Main.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import Screenlock from './Screenlock';
// import Footer from './Footer';
import Home from './Home';
import Lights from './Lights';
import Leds from './Leds';
// import Remote from './Remote';
import Plants from './Plants';

import {
  getKeys,
  assignWithPath,
  parseMqttMessage,
  rgbToHex,
} from '../utils';
import { startMqtt, safePublish } from '../utils/mqtt';

library.add(
  faUserCircle,
  faLightbulb,
  fasLightBulb,
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
  faMoon,
  faArrowLeft,
);


class Main extends React.Component {
  static pages = {
    lights: 'Lights',
    leds: 'Leds',
    plants: 'Plants',
    '': 'Hello Lorenzo!',
  };

  static defState = {
    presets,
    activePreset: -1,
    name: 'Lorenzo',
    screenLocked: false,
    mqtt: false,
    mqttState: {
      lights: {
        floorlamp: false,
        leds: '#ffbb00',
      },
      plants: {
        p1: 0,
        p2: 0,
        p3: 0,
        p4: 0,
        p5: 0,
      },
    },
  };

  constructor(props) {
    super(props);

    console.log(getKeys(Main.defState.mqttState));
    this.state = Main.defState;

    const callbacks = {
      onConnect: this.onMqttConnect,
      onMessage: this.onMqttMessage,
    };
    console.log('In constructor, calling startMqtt()');
    startMqtt(callbacks);
  }

  onMqttConnect = () => {
    this.setState({ mqtt: true });
    return getKeys(this.state.mqttState);
  }

  onMqttMessage = (topic, message) => {
    this.setState({
      mqttState: assignWithPath(
        this.state.mqttState,
        topic,
        parseMqttMessage(message),
      ),
    });
    if (topic === 'lights/leds') {
      const metaThemeColor = document.querySelector('meta[name=theme-color]');
      metaThemeColor.setAttribute('content', message);
    }
  }

  onPresectSelect = (i) => {
    const { activePreset } = this.state;
    this.setState({ activePreset: i === activePreset ? -1 : i });
  }

  lockScreen = (b) => {
    console.log(`${b ? '' : 'un'}locking screen`);
    this.setState({ screenLocked: b });
  }

  onLightSwitch = () => {
    const { lights } = this.state.mqttState;
    const newState = !lights.floorlamp;
    this.setState(
      assignWithPath(
        this.state.mqttState,
        'light/floorlamp',
        newState,
      ),
    );
    safePublish('lights/floorlamp', newState);
  }

  onLedsChange = (colour) => {
    const hex = rgbToHex(colour);
    this.setState(
      assignWithPath(
        this.state.mqttState,
        'light/leds',
        hex,
      ),
    );
    safePublish('lights/leds', hex);
  }

  onRemote = (code) => {
    safePublish('lights/remote', code);
  }

  render() {
    const { location } = this.props;
    const {
      activePreset,
      name,
    } = this.state;
    const { lights, plants } = this.state.mqttState;
    return (
      // Need to wrap components
      <div>
        <Header
          onLock={() => this.lockScreen(true)}
          name={name}
          location={location.pathname} />
        <Sidebar
          name={name} />
        <Screenlock
          onUnlock={() => this.lockScreen(false)}
          locked={this.state.screenLocked} />
        <Route exact path="/">
          <Home
            onPresectSelect={(i) => this.onPresectSelect(i)}
            presets={presets}
            activePreset={activePreset} />
        </Route>
        <Route path="/lights">
          <Lights
            handler={this.onLightSwitch}
            state={lights.floorlamp} />
        </Route>
        <Route path="/leds">
          <Leds
            handler={this.onLedsChange}
            state={lights.leds} />
        </Route>
        <Route path="/plants">
          <Plants
            state={plants}
            plantsDetails={plantDetails} />
        </Route>
      </div>
    );
  }
}

Main.propTypes = {
  location: PropTypes.any,
};

export default withRouter(Main);
