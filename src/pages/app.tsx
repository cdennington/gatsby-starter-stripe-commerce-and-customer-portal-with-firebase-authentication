import React from 'react';
/* eslint-disable import/no-unresolved */
import { Router } from '@reach/router';
import Dashboard from '../components/Dashboard.tsx';
import PrivateRoute from '../components/PrivateRoute.tsx';
import Portal from '../components/Portal.tsx';

const UserApp = () => (
  <Router>
    <PrivateRoute path="/app/dashboard" component={Dashboard} />
    <PrivateRoute path="/app/portal" component={Portal} />
  </Router>
);

export default UserApp;
