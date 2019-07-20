import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import LoginPage from './components/LoginPage';
import TeamsPage from './components/TeamsPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';

const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/teams" component={TeamsPage} />
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/profile" component={ProfilePage} />
  </BrowserRouter>
);

export default Router;
