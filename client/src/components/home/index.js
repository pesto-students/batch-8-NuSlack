import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Spin, Layout } from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import HomeLayout from '../home-layout';

function Home() {
  const { user, teamIds, fetchTeams } = useHomeContext();
  useEffect(() => {
    if (user && user.username) {
      fetchTeams(user._id);
    }
  }, [user, fetchTeams]);

  if (!user || !user.username) {
    return <Redirect to="/" push />;
  }

  if (!teamIds.length) {
    return (
      <Layout>
        <Spin size="large" spinning style={{ marginTop: '15%' }}>
          <div style={{ height: '100vh', width: '100vw' }} />
        </Spin>
      </Layout>
    );
  }

  const activeTeam = localStorage.getItem('activeTeam');

  if (!activeTeam) {
    return <Redirect to="/teams" push />;
  }

  return <HomeLayout />;
}

export default Home;
