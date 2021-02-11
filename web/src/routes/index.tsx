import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import FormConfinement from '../pages/FormConfinement';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/form/:id?" isPrivate component={FormConfinement} />
  </Switch>
);

export default Routes;
