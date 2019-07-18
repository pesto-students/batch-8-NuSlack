import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import LoginPage from './components/LoginPage';
import TeamsPage from './components/TeamsPage';

const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/teams" component={TeamsPage} />
  </BrowserRouter>
);

export default Router;
