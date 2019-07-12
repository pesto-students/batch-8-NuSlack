import React from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from '../home-layout';

function Home() {
  const { user } = useHomeContext();

  if (!user || !user.username) {
    return <Redirect to="/" push />;
  }
  return <HomeLayout />;
}

export default Home;
