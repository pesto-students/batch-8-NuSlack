import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import LoginPage from './components/LoginPage';
import { useHomeContext } from './context/HomeContext';
const Router = () => (
  <useHomeContext.Provider>
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/home" component={Home} />
    </BrowserRouter>
  </useHomeContext.Provider>
);

export default Router;
