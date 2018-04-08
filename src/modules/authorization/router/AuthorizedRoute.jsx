import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, currentUser, ...rest } = this.props;
    return (
      <Route {...rest} render={props => {
        return currentUser
            ? <Component {...props} />
            : <Redirect to='/auth/login' />;
      }} />
    );
  }
}

  /**
 * Typechecking With PropTypes
 * Reference https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 * Proptypes: https://github.com/facebook/prop-types
 */
AuthorizedRoute.propTypes = {
  component: PropTypes.any,
  currentUser: PropTypes.object
};

const stateToProps = ({ auth_users }) => ({
  currentUser: auth_users.currentUser
});

export default connect(stateToProps)(AuthorizedRoute);
