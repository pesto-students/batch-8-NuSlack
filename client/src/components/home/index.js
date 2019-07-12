import React from 'react';
import HomeLayout from '../home-layout';
import { useHomeContext } from '../../context/HomeContext';

function Home() {
  return (
    <useHomeContext.Provider>
      <HomeLayout />
    </useHomeContext.Provider>
  );
}

export default Home;
