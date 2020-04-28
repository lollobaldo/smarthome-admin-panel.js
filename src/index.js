/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((reg) => {
        console.log('Service worker registered! 😎', reg);
      })
      .catch((err) => {
        console.log('😥 Service worker registration failed: ', err);
      });
  });
}

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot />
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
