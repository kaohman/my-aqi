import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Home from './home';

export default function Pages() {
  return (
    <Router primary={false} component={Fragment}>
      <Home path="/" />
    </Router>
  );
}
