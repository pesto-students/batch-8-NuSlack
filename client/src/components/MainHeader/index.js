import React, { useEffect, useState } from 'react';
import {
  Icon, Row, Col, Avatar, Layout, Button, Drawer,
} from 'antd';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import SmallButton from '../SmallButton';
import { useHomeContext } from '../../context/HomeContext';
import TeamsDrawer from '../TeamsDrawer';

const { Header } = Layout;

const LoggedInUser = styled.div`
  color: white;
  h1.user-name {
    color: white;
    font-size: 1.6em;
    display: inline;
  }
  display: flex;
  align-items: center;
  margin-right: 10px;

  a {
    height: 58px;
    display: inline-block;
    padding: 0 10px;
    &:hover {
      background: #646b92;
      border-radius: 10px;
      box-shadow: inset 0 0 5px black;
      transition: 0.3s all;
    }
  }

  span.mobile-profile {
    height: 58px;
    display: inline-block;
    padding-top: 5px;
    &:hover {
      background: #646b92;
      border-radius: 10px;
      box-shadow: inset 0 0 5px black;
      transition: 0.3s all;
    }
  }
`;

const HomeHeader = styled(Header)`
  height: 64px;
  background: #2d3561;
  display: block;

  .main-header-row-full {
    height: 64px;
    @media (max-width: 1200px) {
      display: none;
    }
  }

  .main-header-row-mobile {
    height: 64px;
    @media (min-width: 1200px) {
      display: none;
    }
  }

  img.main-header-logo {
    height: 40px;
  }

  .header-text {
    color: white;
    position: relative;
    top: 8px;
    font-size: 1.8em;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    font-size: 20px;
    position: relative;
    top: -4px;
    margin-right: 5px;
  }
`;

const MainHeader = (props) => {
  const {
    user, logoutUser, activeTeam, teamsMap,
  } = useHomeContext();
  const [teamName, setTeamName] = useState('');
  useEffect(() => {
    if (teamsMap && teamsMap[activeTeam]) {
      setTeamName(teamsMap[activeTeam].name || '');
    }
  }, [activeTeam, teamsMap]);

  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const { pathname } = props.location;

  const isHome = pathname === '/home';
  return (
    <HomeHeader className="home-header">
      <Row className="main-header-row-full">
        <Col span={8}>
          <Row type="flex" justify="start">
            <Col>
              <Link to="/">
                <img
                  className="main-header-logo"
                  src="./images/transparent-logo.png"
                  alt="nu-slack"
                />
              </Link>
              <span className="header-text">&nbsp; - &nbsp;</span>
              <span className="header-text">Team ({teamName || 'Not Selected'})</span>
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Row type="flex" align="middle" justify="end">
            <LoggedInUser>
              <Link to="/profile">
                <Avatar
                  shape="circle"
                  className="user-avatar"
                  icon="user"
                  src={user && user.avatar}
                />
                <h1 className="user-name">{user && user.username}</h1>
              </Link>
            </LoggedInUser>
            <Link to="/teams">
              <Button type="primary">Invitations</Button>
            </Link>
            &nbsp;
            {isHome ? <TeamsDrawer /> : null}
            &nbsp;
            <SmallButton onClick={logoutUser}>
              <Icon type="logout" /> Logout
            </SmallButton>
          </Row>
        </Col>
      </Row>
      <Row className="main-header-row-mobile">
        <Col span={20}>
          <Row type="flex" justify="start">
            <Col>
              <Link to="/">
                <img
                  className="main-header-logo"
                  src="./images/transparent-logo-small.png"
                  alt="nu-slack"
                />
              </Link>
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <Row type="flex" align="middle" justify="end">
            <LoggedInUser>
              <span className="mobile-profile">
                <Avatar
                  shape="circle"
                  className="user-avatar"
                  icon="user"
                  src={user && user.avatar}
                  onClick={() => setMobileMenuVisible(true)}
                />
              </span>
            </LoggedInUser>
          </Row>
        </Col>
      </Row>
      <Drawer
        title={(
          <div style={{ textAlign: 'center' }}>
            <div>
              <Link to="/">
                <img
                  className="main-header-logo"
                  src="./images/transparent-logo.png"
                  alt="nu-slack"
                  style={{ width: '60%' }}
                />
              </Link>
            </div>
            <span style={{ fontSize: '1.4em', margin: '20px', display: 'inline-block' }}>({teamName || 'Select Team'})</span>
            <hr />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: 'content',
              }}
            >
              <Link to="/profile">
                <h1 style={{ fontSize: '1.4em', margin: 0, color: '#ff8080' }} className="user-name">{user && user.username}</h1>
              </Link>
            </div>
          </div>
)}
        placement="top"
        closable
        onClose={() => setMobileMenuVisible(false)}
        visible={isMobileMenuVisible}
        height="content"
      >
        <div
          style={{
            display: 'flex', padding: '20px', justifyContent: 'center', height: 'content',
          }}
        >
          <Link to="/teams">
            <Button type="primary">Invitations</Button>
          </Link>
          &nbsp;
          {isHome ? <TeamsDrawer /> : null}
          &nbsp;
          <SmallButton onClick={logoutUser}>
            <Icon type="logout" /> Logout
          </SmallButton>
        </div>
      </Drawer>
    </HomeHeader>
  );
};

MainHeader.propTypes = {
  location: PropTypes.func.isRequired,
};

export default withRouter(MainHeader);
