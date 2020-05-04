import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
// import posed, { PoseGroup } from "react-pose";


import './Header.scss';

import profilePic from '../../res/pp.jpg';
import arrowLeft from '../../res/icons/icons8-left-50.png';

const locationsDict = {
  lights: 'Lights',
  leds: 'Leds',
  plants: 'Plants',
  '': 'Hello Lorenzo!',
};

const Header = ({ location, lockScreen }) => (
  <header className="w3-container w3-xlarge w3-padding-16 w3-card">
    <div className="header-container">
      <Switch>
        {Object.entries(locationsDict)
          .map(([path, value]) => (
            <Route path={`/${path}`} key={path}>
              <p>
                {location !== '/'
                  ? (<Link to='/'>
                      <img src={arrowLeft}
                        className="icon-back" />
                    </Link>)
                  : null}
                {value}
                <img src={profilePic}
                  onDoubleClick={() => lockScreen(true)}
                  className="user-icon"
                  alt="Profile picture" />
              </p>
            </Route>
          ))}
        {/* <Route path="/lights">
          <p>
            <Link to="/">
              <img src={} className="icon-back" />
            </Link>
            Lights
            <img src={profilePic} className="user-icon" alt="pic" />
          </p>
        </Route>
        <Route path="/leds">
          <p>
            <Link to="/">
              <img src={arrowLeft} className="icon-back" />
            </Link>
            Leds
            <img src={profilePic} className="user-icon" alt="pic" />
          </p>
        </Route>
        <Route path="/plants">
          <p>
            <Link to="/">
              <img src={arrowLeft} className="icon-back" />
            </Link>
            Plants
            <img src={profilePic} className="user-icon" alt="pic" />
          </p>
        </Route>
        <Route exact path="/">
          <p>
            Hello Lorenzo!
            <img src={profilePic} className="user-icon" alt="pic" />
          </p>
        </Route> */}
      </Switch>
    </div>
  </header>
);

Header.propTypes = PropTypes.shape({
  name: PropTypes.string,
  location: PropTypes.string,
  lockScreen: PropTypes.func,
}).isRequired;

export default Header;
