/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import configureStore, { history } from './store/configureStore';
// import Root from './components/Root';
import App from './components/App';
// import './styles/styles.scss';
import './favicon.ico'; // Tell webpack to load favicon.ico
// const store = configureStore();

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
