import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { toTitleCase } from 'src/utils';

import logo from 'res/icons/logo.png';

import './Sidebar.scss';

const Sidebar = ({ pages }) => (
  <div className="nav w3-container w3-xlarge w3-padding-16 w3-card">
    <header>
      <img
        className="sidebar-icon"
        src={logo}
        alt="MyMoSA.2.0" />
      MyMoSA.2.0
    </header>
    <nav>
      {pages.map(({ path, label, icon }) => (
        <p key={path}>
          <Link to={path}>
            <img
              className="sidebar-icon"
              src={icon}
              alt={label || toTitleCase(path)} />
            {label || toTitleCase(path)}
          </Link>
        </p>
      ))}
    </nav>
  </div>
);

Sidebar.propTypes = PropTypes.shape({
  pages: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}).isRequired;

export default Sidebar;
