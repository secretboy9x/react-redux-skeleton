import React from 'react';

import { AuthorizedRoute } from 'modules/authorization/router';
import { Container } from '../pages';

const DemoRouter = () => {
  return (
    <AuthorizedRoute key={'demo'} path='/demo' component={Container}/>
  );
};

export default DemoRouter;
