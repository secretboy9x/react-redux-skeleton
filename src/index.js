import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import './assets/sass/app.scss';
import 'bootstrap';
import { App } from 'modules/core/pages';
import { configureStore } from 'common';
import { AppContainer } from 'react-hot-loader';

import { locale, messages } from 'localization';

const initialState = {};
const { store, actions } =
  configureStore({ initialState });

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <IntlProvider locale={locale} messages={messages}>
        <Component
          store={store}
          actions={actions} />
      </IntlProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  render(App);
}
