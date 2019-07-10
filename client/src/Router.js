import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import App from './App';

const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={App} />
    <Route exact path="/home" component={Home} />
  </BrowserRouter>
);

export default Router;
