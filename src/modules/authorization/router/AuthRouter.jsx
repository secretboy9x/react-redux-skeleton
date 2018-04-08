import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppConstants } from 'common';
import { Login } from 'modules/authorization/pages';

class AuthRouter extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && this.currentUser !== nextProps.currentUser) {
      const { history } = this.props;
      history.push(AppConstants.defaultPagePath.homePage);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/login`} exact={true} component={Login} />
        <Redirect to={`${match.path}/login`} />
      </Switch>
    );
  }
}

AuthRouter.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.any,
  match: PropTypes.any
};

const stateToProps = ({ auth_users }) => ({
  currentUser: auth_users.currentUser
});

export default connect(stateToProps)(AuthRouter);
