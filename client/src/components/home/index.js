import React from 'react';
import { Redirect } from 'react-router-dom';
import { useHomeContext } from '../../context/HomeContext';
import HomeLayout from '../home-layout';

function Home() {
  const { user, teamIds } = useHomeContext();
  if (!user || !user.username) {
    return <Redirect to="/" push />;
  }
  if (!teamIds.length) {
    return <Redirect to="/teams" push />;
  }
  return <HomeLayout />;
}

export default Home;
