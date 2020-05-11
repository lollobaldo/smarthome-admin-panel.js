import React from 'react';
import PropTypes from 'prop-types';
// import posed, { PoseGroup } from "react-pose";


import './Screenlock.scss';

const Screenlock = ({ onUnlock, locked }) => (
  <div
    className={`screen-lock--${locked ? '' : 'un'}locked`}
    onDoubleClick={onUnlock}>
  </div>
);

Screenlock.propTypes = PropTypes.shape({
  onUnlock: PropTypes.func.isRequired,
  locked: PropTypes.bool.isRequired,
}).isRequired;

export default Screenlock;
