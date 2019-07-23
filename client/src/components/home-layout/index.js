import React from 'react';
import { Layout } from 'antd';
import MainHeader from '../MainHeader';
import Sidebar from '../Sidebar';
import ChatComponent from '../ChatComponent';

const HomeLayout = () => (
  <Layout style={{ height: '100vh' }}>
    <MainHeader />
    <Layout style={{ height: '100%' }}>
      <Sidebar />
      <Layout style={{ borderLeft: '1px solid #c1c1c1' }}>
        <ChatComponent />
      </Layout>
    </Layout>
  </Layout>
);

export default HomeLayout;
