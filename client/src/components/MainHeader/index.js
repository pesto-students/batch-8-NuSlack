import React from 'react';
import {
  Icon, Row, Col, Avatar, Layout,
} from 'antd';
import styled from 'styled-components';
import CircleButton from '../CircleButton';
import SmallButton from '../SmallButton';
import { useHomeContext } from '../../context/HomeContext';

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
  @media only screen and (max-width: 600px) {
    padding: 0 25px;
    font-size: 11px;
    .ant-avatar {
      height: 60px !important;
      width: 60px !important;
    }
  }
`;

const MainHeader = () => {
  const { user, logoutUser } = useHomeContext();

  return (
    <HomeHeader className="home-header">
      <Row>
        <Col span={12}>
          <Row type="flex" align="middle" justify="start" style={{ height: '100px' }}>
            <Avatar shape="square" size={90} icon="user" />
            <LoggedInUser>
              <h1 className="user-name">{user && user.username}</h1>
              <UserStatus>
                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                Online
              </UserStatus>
            </LoggedInUser>
          </Row>
        </Col>
        <Col span={12}>
          <Row type="flex" align="middle" justify="end" style={{ height: '100px' }}>
            <Col span={32}>
              <CircleButton>
                <Icon type="setting" />
              </CircleButton>
              &nbsp;
              <SmallButton onClick={logoutUser}>
                <Icon type="logout" /> Logout
              </SmallButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </HomeHeader>
  );
};

export default MainHeader;
