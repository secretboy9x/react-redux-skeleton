import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { asyncComponent } from 'modules/core/components';
const Home = asyncComponent(() => import('../pages/home/Home'));

/**
 * Define all sub-route for a module
 */
const DemoRoute = ({ match }) => {
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/home`} exact={true} component={Home} />
        <Redirect to={`${match.path}/home`} />
      </Switch>
    </div>
  );
};

DemoRoute.propTypes = {
  match: PropTypes.any
};

export default DemoRoute;
