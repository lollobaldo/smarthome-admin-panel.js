import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import tinycolor from 'tinycolor2';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from 'styled-theming';

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
import ledsEffects from 'src/ledsEffects';

import './Main.scss';
import './w3css.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Statusbar from './Statusbar';
import Login from './Login';
import Screenlock from './Screenlock';
// import Footer from './Footer';
import Home from './Home';
import Lights from './Lights';
import Leds from './Leds';
import Plants from './Plants';


import {
  pages, defState, presets, screenLockStatus,
} from '../utils/constants';
import { body, card } from '../utils/themes';
import {
  path2page,
  getKeys,
  assignWithPath,
  parseMqttMessage,
  fullHex,
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

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  body {
    margin: 0;
    overflow: hidden;
    ${theme('mode', body)}
  }

  a {
    text-decoration: none;
  }

  .card {
    ${theme('mode', card)}
  }
`;

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

  onThemeChange = () => {
    this.setState({
      selectedTheme:
        this.state.selectedTheme === 'light'
          ? 'dark' : 'light',
    });
  };

  onPresectSelect = (i) => {
    const { activePreset } = this.state;
    this.setState({ activePreset: i === activePreset ? -1 : i });
  }

  lockScreen = (pinRequired = true) => {
    console.log('Locking screen');
    this.setState({
      screenLocked:
        pinRequired ? screenLockStatus.PIN_LOCKED
          : screenLockStatus.LOCKED,
    });
    if (window.AndroidWrapper) {
      window.AndroidWrapper.turnOffLCD();
    }
  }

  unlockScreen = () => {
    console.log('Unlocking screen');
    if (window.AndroidWrapper) {
      window.AndroidWrapper.turnOnLCD();
    }
    if (this.state.screenLocked === screenLockStatus.PIN_LOCKED) {
      this.setState({ screenLocked: screenLockStatus.INSERTING_PIN });
    } else {
      this.setState({ screenLocked: screenLockStatus.UNLOCKED });
    }
  }

  onLightSwitch = () => {
    const { lights } = this.state.mqttState;
    const newState = !lights.floorlamp;
    this.setState(
      assignWithPath(
        this.state.mqttState,
        'lights/floorlamp',
        newState,
      ),
    );
    safePublish('lights/floorlamp', newState);
  }

  onLedsChange = (colour) => {
    console.log(colour);
    let state;
    let command;
    if (!Array.isArray(colour)) {
      state = tinycolor(colour).toHexString();
      command = state;
    } else {
      state = colour;
      command = `%${colour.map(fullHex).join()}`;
    }
    this.setState(
      assignWithPath(
        this.state.mqttState,
        'lights/leds',
        state,
      ),
    );
    safePublish('lights/leds', command);
  }

  onRemote = (code) => {
    safePublish('lights/remote', code);
  }

  render() {
    const { location } = this.props;
    const {
      activePreset,
      name,
      selectedTheme,
    } = this.state;
    const { lights, plants } = this.state.mqttState;
    return (
      // Need to wrap components
      <ThemeProvider theme={{ mode: selectedTheme }}>
        <GlobalStyle />
        <div id="content">
          <Header
            selectedTheme={selectedTheme}
            changeTheme={this.onThemeChange}
            name={name}
            page={path2page(location.pathname)} />
          <Sidebar
            pages={pages}
            lockWithPin={() => this.lockScreen(true)}
            lockWithoutPin={() => this.lockScreen(false)} />
          { !this.state.auth
            ? <Login
                onUnlock={this.auth}
                pin={this.state.pin} />
            : null}
          { this.state.screenLocked !== screenLockStatus.UNLOCKED
            ? <Screenlock
                onLock={this.lockScreen}
                onUnlock={this.unlockScreen}
                pin={this.state.pin}
                status={this.state.screenLocked} />
            : null}
          <Route exact path="/">
            <Home
              onPresectSelect={(i) => this.onPresectSelect(i)}
              presets={presets}
              activePreset={activePreset}
              state={this.state.mqttState}
              onLightSwitch={this.onLightSwitch} />
          </Route>
          <Route path="/lights">
            <Lights
              handler={this.onLightSwitch}
              state={lights.floorlamp} />
          </Route>
          <Route path="/leds">
            <Leds
              handler={this.onLedsChange}
              state={lights.leds}
              effects={ledsEffects} />
          </Route>
          <Route path="/plants">
            <Plants
              state={plants}
              plantsDetails={plantDetails} />
          </Route>
          <Route path="/trial">
            {/* <ColorWheel /> */}
          </Route>
          <Statusbar />
        </div>
      </ThemeProvider>
    );
  }
}

Main.propTypes = {
  location: PropTypes.any,
};

export default withRouter(Main);
