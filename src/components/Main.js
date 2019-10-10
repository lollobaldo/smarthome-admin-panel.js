import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";

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
  faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faHeart as fasHeart, faLightbulb as fasLightBulb } from '@fortawesome/free-regular-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { presets } from '../constants';
import './Main.scss';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Lights from './Lights';

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
  faArrowLeft,);

const RoutesContainer = posed.div({
  // enter: {
  //   // opacity: 1,
  //   // delay: 300,
  //   beforeChildren: true
  // },
  // exit: { opacity: 0 }
});

class Main extends React.Component {

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
    const { location } = this.props;
    return (
      <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
        <Switch>
          <PoseGroup style={{height: '100%'}}>
            <RoutesContainer key={location.pathname}>
              <Header name={name} location={location.pathname} />
              <Route path="/lights/">
                <Lights />
              </Route>
              <Route exact path="/">
                <Home
                  presets={presets}
                  activePreset={activePreset}
                  onPresectSelect={(i) => this.onPresectSelect(i)} />
              </Route>
            </RoutesContainer>
          </PoseGroup>
        </Switch>
      </div>
    );
  }
}

Main.propTypes = {
  location: PropTypes.any,
}

export default withRouter(Main);
