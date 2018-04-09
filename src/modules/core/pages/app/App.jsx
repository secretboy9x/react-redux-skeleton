import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import {
  LoadingIndicator,
  Modal,
  ErrorHandler,
  Alert
} from 'modules/core/components';

import './app.scss';
import AppRouter from '../../router/AppRouter';
import { LanguageProvider } from '..';
import { messages } from 'localization';

class App extends React.Component {
  renderAppContent() {
    return (
      <div className={'app-container'}>
        <AppRouter />
        <Modal actions={this.props.actions} />
        <Alert actions={this.props.actions} />
        <ErrorHandler actions={this.props.actions} />
        <LoadingIndicator />
      </div>
    );
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <LanguageProvider messages={messages}>
          {this.renderAppContent()}
        </LanguageProvider>
      </Provider>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object,
  store: PropTypes.any
};

export default App;
