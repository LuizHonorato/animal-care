import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import FormConfinement from '../pages/FormConfinement';
import Treatment from '../pages/Treatment';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/form/:id?" isPrivate component={FormConfinement} />
    <Route path="/trato/:id?" isPrivate component={Treatment} />
  </Switch>
);

export default Routes;
