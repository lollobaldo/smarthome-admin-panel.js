import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

const Header = ({ location, onLock }) => (
  <header className="header w3-container w3-xlarge w3-padding-16 w3-card">
    <div className="header-container">
      <p>
        {location !== '/'
          ? (<Link to='/'>
              <img src={arrowLeft}
                className="icon-back" />
            </Link>)
          : null}
        {locationsDict[location]}
        <img src={profilePic}
          onClick={onLock}
          className="user-icon"
          alt="Profile picture" />
      </p>
    </div>
  </header>
);

Header.propTypes = PropTypes.shape({
  name: PropTypes.string,
  location: PropTypes.string,
  lockScreen: PropTypes.func,
}).isRequired;

export default Header;
