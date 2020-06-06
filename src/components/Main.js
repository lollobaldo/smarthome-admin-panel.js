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

import plantDetails from 'src/plantsDetails';

import './Main.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import Login from './Login';
import Screenlock from './Screenlock';
// import Footer from './Footer';
import Home from './Home';
import Lights from './Lights';
import Leds from './Leds';
import ColorWheel from './ColorWheel';
// import Remote from './Remote';
import Plants from './Plants';


import {
  pages, defState, presets, screenLockStatus,
} from '../utils/constants';
import {
  path2page,
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
  constructor(props) {
    super(props);

    this.state = defState;

    if (document.cookie.split('; ')
      .find((row) => row.startsWith('auth'))) {
      this.state = { ...defState, auth: true };
    }

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

  auth = () => {
    this.setState({ auth: true });
    document.cookie = 'auth=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
  };

  onPresectSelect = (i) => {
    const { activePreset } = this.state;
    this.setState({ activePreset: i === activePreset ? -1 : i });
  }

  lockScreen = (pinRequired) => {
    console.log('Locking screen');
    this.setState({
      screenLocked:
        pinRequired ? screenLockStatus.INSERTING_PIN
          : screenLockStatus.BLACK,
    });
    if (window.AndroidWrapper) {
      window.AndroidWrapper.turnOffLCD();
    }
  }

  unlockScreen = () => {
    console.log('Unlocking screen');
    this.setState({ screenLocked: screenLockStatus.UNLOCKED });
    if (window.AndroidWrapper) {
      window.AndroidWrapper.turnOnLCD();
    }
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
          onLock={() => this.lockScreen(false)}
          name={name}
          page={path2page(location.pathname)} />
        <Sidebar
          pages={pages}
          lockWithPin={() => this.lockScreen(true)}
          lockWithoutPin={() => this.lockScreen(false)} />
        { !this.state.auth
          ? <Login
              onUnlock={() => this.auth()}
              pin={this.state.pin} />
          : null}
        { this.state.screenLocked !== screenLockStatus.UNLOCKED
          ? <Screenlock
              onUnlock={() => this.unlockScreen()}
              pin={this.state.pin}
              status={this.state.screenLocked} />
          : null}
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
        <Route path="/trial">
          <ColorWheel />
        </Route>
      </div>
    );
  }
}

Main.propTypes = {
  location: PropTypes.any,
};

export default withRouter(Main);
