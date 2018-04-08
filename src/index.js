import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import './assets/sass/app.scss';
import 'bootstrap';
import { App } from 'modules/core/pages';
import { configureStore } from 'common';

import { language, messages } from 'localization';

const initialState = {};
const { store, actions } =
  configureStore({ initialState });

let render = () => {
  const mountNode = document.querySelector('#root');
  ReactDOM.render(
    <IntlProvider locale={language} messages={messages}>
      <App
        store={store}
        actions={actions} />
    </IntlProvider>, mountNode);
};

render();
