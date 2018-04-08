import React, {Component} from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as _ from 'lodash';

import { AuthRouter } from 'modules/authorization/router';
import { NotFound } from 'modules/core/pages';
import { routers } from 'modules';

class AppRouter extends Component {
  render() {
    // Get all modules routes
    let moduleRoutes = [];
    Object.keys(routers).forEach(key => {
      const mRouteFunc = routers[key];
      if (_.isFunction(mRouteFunc)) {
        moduleRoutes.push(mRouteFunc());
      }
    });

    return (
      <HashRouter>
        <Switch>
          <Route path='/auth' component={AuthRouter} />
          {moduleRoutes}
          <Redirect exact={true} from='/' to='/auth'/>
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    );
  }
}

export default AppRouter;
