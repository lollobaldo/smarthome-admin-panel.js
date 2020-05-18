import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

const Sidebar = ({ pages }) => (
  <nav className="w3-container w3-xlarge w3-padding-16 w3-card">
    {Object.entries(pages).map(([link, name]) => (
      <p key={link}>
        <Link to={link}>
          {name}
        </Link>
      </p>
    ))}
  </nav>
);

Sidebar.propTypes = PropTypes.shape({
  pages: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}).isRequired;

export default Sidebar;
