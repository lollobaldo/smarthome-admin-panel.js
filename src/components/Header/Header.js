import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import posed, { PoseGroup } from "react-pose";

import { path2title } from 'src/utils';

import './Header.scss';

import profilePic from '../../res/pp.jpg';
import arrowLeft from '../../res/icons/icons8-left-50.png';

const Header = ({ page, onLock }) => (
  <header className="header w3-container w3-xlarge w3-padding-16 w3-card">
    <div className="header-container">
      <p>
        {page.path !== '/'
          ? (<Link to='/'>
              <img src={arrowLeft}
                className="icon-back" />
            </Link>)
          : null}
        {page.title || path2title(page.path)}
        <img src={profilePic}
          onClick={onLock}
          className="user-icon"
          alt="Profile picture" />
      </p>
    </div>
  </header>
);

Header.propTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  page: PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string,
  }).isRequired,
  lockScreen: PropTypes.func.isRequired,
}).isRequired;

export default Header;
