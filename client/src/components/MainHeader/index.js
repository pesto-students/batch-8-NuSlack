import React, { useEffect, useState } from 'react';
import {
  Icon, Row, Col, Layout, Button,
} from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SmallButton from '../SmallButton';
import { useHomeContext } from '../../context/HomeContext';
import TeamsDrawer from '../TeamsDrawer';

const { Header } = Layout;

const LoggedInUser = styled.div`
  padding: 10px;
  color: white;
  line-height: 2em;
  h1.user-name {
    color: white;
    font-size: 1.6em;
    margin: 0;
    display: inline-block;
    vertical-align: center;
  }
`;

const HomeHeader = styled(Header)`
  height: 64px;
  background: #2d3561;

  .main-header-row {
    height: 64px;
  }

  img.main-header-logo {
    height: 40px;
    margin-bottom: 10px;
  }

  .header-text {
    color: white;
    font-size: 1.8em;
    vertical-align: bottom;
    display: inline-block;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    font-size: 20px;
  }

  .main-header-logo-wrapper {
    display: block;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 25px;
    font-size: 11px;
    .ant-avatar {
      height: 64px !important;
      width: 64px !important;
    }
  }
`;

const MainHeader = () => {
  const {
    user, logoutUser, activeTeam, fetchTeams, teamsMap,
  } = useHomeContext();
  const [teamName, setTeamName] = useState('');
  useEffect(() => {
    fetchTeams(user._id);
  }, [user, fetchTeams]);
  useEffect(() => {
    if (teamsMap && teamsMap[activeTeam]) {
      setTeamName(teamsMap[activeTeam].name || '');
    }
  }, [activeTeam, teamsMap]);
  return (
    <HomeHeader className="home-header">
      <Row>
        <Col span={12}>
          <Row type="flex" align="middle" justify="start" className="main-header-row">
            <div className="main-header-logo-wrapper">
              <Link to="/">
                <img
                  className="main-header-logo"
                  src="./images/transparent-logo.png"
                  alt="nu-slack"
                />
              </Link>
              <span className="header-text">&nbsp; - &nbsp;</span>
              <span className="header-text">Team ({teamName || '--'})</span>
            </div>
          </Row>
        </Col>
        <Col span={12}>
          <Row type="flex" align="middle" justify="end" className="main-header-row">
            <LoggedInUser>
              <Link to="/profile">
                <h1 className="user-name">{user && user.username}</h1>
              </Link>
            </LoggedInUser>
            <Link to="/teams">
              <Button type="primary">Invitations</Button>
            </Link>
            &nbsp;
            <TeamsDrawer />
            &nbsp;
            <SmallButton onClick={logoutUser}>
              <Icon type="logout" /> Logout
            </SmallButton>
          </Row>
        </Col>
      </Row>
    </HomeHeader>
  );
};

export default MainHeader;
