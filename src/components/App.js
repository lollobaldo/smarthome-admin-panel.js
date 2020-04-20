import PropTypes from 'prop-types';
import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader';

import Main from './Main';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Router>
        <Main />
      </Router>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default hot(module)(App);
