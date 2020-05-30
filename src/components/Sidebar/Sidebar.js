import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { path2title } from 'src/utils';

import logo from 'res/icons/logo.png';
import iconLock from 'res/icons/lock-round.svg';
import iconLockPin from 'res/icons/pin-1.svg';

import './Sidebar.scss';

const Sidebar = ({ pages, lockWithPin, lockWithoutPin }) => (
  <div className="nav w3-container w3-xlarge w3-padding-16 w3-card">
    <header>
      <img
        className="sidebar-icon"
        src={logo}
        alt="MyMoSA.2.0" />
      MyMoSA.2.0
    </header>
    <hr />
    <nav>
      {/* <div> */}
        {pages.map(({ path, title, icon }) => (
          <p key={path}>
            <Link to={path}>
              <img
                className="sidebar-icon"
                src={icon}
                alt={title || path2title(path)} />
              {title || path2title(path)}
            </Link>
          </p>
        ))}
      {/* </div> */}
      <hr />
      <div className="bottom-links">
        <p onClick={lockWithPin}>
          <img
            className="sidebar-icon"
            src={iconLockPin}
            alt="Lock with pin" />
          Lock with pin
        </p>
        <p onClick={lockWithoutPin}>
          <img
            className="sidebar-icon"
            src={iconLock}
            alt="Lock" />
          Lock
        </p>
      </div>
    </nav>
  </div>
);

Sidebar.propTypes = PropTypes.shape({
  pages: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}).isRequired;

export default Sidebar;
