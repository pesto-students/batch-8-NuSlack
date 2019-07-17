import React from 'react';
import Router from './Router';
import { useHomeContext } from './context/HomeContext';
import './App.css';

function App() {
  return (
    <useHomeContext.Provider>
      <Router />
    </useHomeContext.Provider>
  );
}

export default App;
