import React from 'react';
import PropTypes from 'prop-types';

import iconOk from 'res/icons/ok.svg';
import iconWarning from 'res/icons/warning.svg';
import iconError from 'res/icons/error.svg';

import { serviceStatus } from '../../utils/constants';

import './Statusbar.scss';

const list = [
  {
    name: 'Lights',
    status: serviceStatus.OK,
  },
  {
    name: 'Leds',
    status: serviceStatus.OK,
  },
  {
    name: 'Fans',
    status: serviceStatus.ERROR,
  },
  {
    name: 'Plants',
    status: serviceStatus.WARNING,
  },
];

const status2icon = (status) => {
  switch (status) {
    case serviceStatus.OK:
      return iconOk;
    case serviceStatus.WARNING:
      return iconWarning;
    case serviceStatus.ERROR:
      return iconError;
    default:
      return '';
  }
};

const Statusbar = () => (
  <div className="statusbar w3-container w3-xlarge w3-padding-16 w3-card">
    {
      list.map(({ name, status }) => (
        <p key={name} className=''>
          <img src={status2icon(status)} />
          {name}
        </p>
      ))
    }
  </div>
);

Statusbar.propTypes = PropTypes.shape({
}).isRequired;

export default Statusbar;
