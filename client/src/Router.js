import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import LoginPage from './components/LoginPage';

const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/home" component={Home} />
  </BrowserRouter>
);

export default Router;
