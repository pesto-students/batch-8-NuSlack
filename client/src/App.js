import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/chat/:username" exact component={Layout} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}
