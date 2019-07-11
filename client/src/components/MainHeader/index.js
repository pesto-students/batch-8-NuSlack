import React, { useState } from 'react';
import {
  Icon, Row, Col, Avatar, Layout,
} from 'antd';
import styled from 'styled-components';
import CircleButton from '../CircleButton';

const { Header } = Layout;

const LoggedInUser = styled.div`
  padding: 10px;
  color: white;
  line-height: 2em;
  h1.user-name {
    color: white;
    font-size: 1.8em;
    margin: 0;
  }
`;
const UserStatus = styled.div`
  font-size: 1.4em;
  line-height: 1.5em;
`;
const HomeHeader = styled(Header)`
  height: 100px;
  background: #607d8b;
`;
const MainHeader = () => {
  const [username] = useState('JohnDoe');
  return (
    <HomeHeader className="home-header">
      <Row>
        <Col span={12}>
          <Row type="flex" align="middle" justify="start" style={{ height: '100px' }}>
            <Avatar shape="square" size={90} icon="user" />
            <LoggedInUser>
              <h1 className="user-name">{username}</h1>
              <UserStatus>
                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> Online
              </UserStatus>
            </LoggedInUser>
          </Row>
        </Col>
        <Col span={12}>
          <Row type="flex" align="middle" justify="end" style={{ height: '100px' }}>
            <Col span={32}>
              <CircleButton>
                <Icon type="bell" />
              </CircleButton>
              &nbsp;
              <CircleButton>
                <Icon type="menu" />
              </CircleButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </HomeHeader>
  );
};

export default MainHeader;
