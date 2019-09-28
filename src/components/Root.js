import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from './App';

export default class Root extends Component {
  render() {
    return (
      <App />
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
