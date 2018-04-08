/**
 * React / Redux dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * The application library, component, etc...
 */
import { LoginForm } from './components/login-form';
import { AppConstants, RootActions as actions } from 'common';
/**
 * The assets such as css, images
 */
import './login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(newProps) {
    const { history } = this.props;
    if (newProps.currentUser) {
      history.push(AppConstants.defaultPagePath.homePage);
    }
  }

  authorize(formValues) {
    let username = formValues.username;
    let password = formValues.password;
    actions.auth_users.login(username, password);
  }

  render() {
    return (
      <div className={'wrapper-center-login'}>
        <LoginForm
        actions={actions}
        authorize={this.authorize.bind(this)} />
      </div>
    );
  }
}

/**
 * Typechecking With PropTypes
 * Reference https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * Proptypes: https://github.com/facebook/prop-types
 */
Login.propTypes = {
  history: PropTypes.any,
  studio: PropTypes.string
};

export default connect(state => ({
  error: state.core_errorHandler.error,
  currentUser: state.auth_users.currentUser,
  errors: state.auth_users.errors
}))(Login);
