import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import { useHomeContext } from '../../context/HomeContext';
import AddChannelModal from '../AddChannelModal';
import SearchBox from '../ChannelUserSearch';

const { SubMenu } = Menu;
const { Sider } = Layout;
const Status = styled.div`
  display: inline-block;
  background-color: ${props => (props.online === true ? 'green' : '#cccccc')};
  border-radius: 50%;
  height: 0.5em;
  width: 0.5em;
`;

const UnreadCount = styled.span`
  height: 1em;
  width: 1em;
  border-radius: 50%;
  background-color: #d8e6df;
  color: green;
  padding: 0.2em 0.4em;
`;
const StyledSidebar = styled(Sider)`
  .ant-layout-sider-children {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ant-menu {
    overflow-x: hidden;
  }
  .ant-layout-sider-trigger {
    min-width: 48px !important;
    background-color: rgba(222, 222, 222, 0.7);
  }
`;
const SideBarContainer = ({ children, activeKey }) => (
  <StyledSidebar
    width={300}
    style={{
      overflow: 'hidden',
      height: '100%',
    }}
    breakpoint="sm"
    collapsible
    theme="light"
    collapsedWidth={0.1}
  >
    <Menu
      mode="inline"
      selectedKeys={[activeKey]}
      defaultOpenKeys={['sub1', 'sub2']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {children}
    </Menu>
  </StyledSidebar>
);
SideBarContainer.propTypes = {
  children: PropTypes.node.isRequired,
  activeKey: PropTypes.string,
};
SideBarContainer.defaultProps = {
  activeKey: null,
};
const Sidebar = () => {
  const [channelModalIsVisible, setChannelModalIsVisible] = useState(false);

  const {
    user,
    setActiveChannel,
    channelIds,
    channelsMap,
    fetchChannels,
    fetchUsers,
    allUserIds,
    allUsersMap,
    setActiveUser,
    activeTeam,
    activeChannel,
    activeUser,
  } = useHomeContext();
  useEffect(() => {
    if (user._id) {
      fetchChannels(user._id, activeTeam);
      fetchUsers(activeTeam);
    }
  }, [user, fetchChannels, fetchUsers, activeTeam]);

  const toggleModal = () => {
    setChannelModalIsVisible(!channelModalIsVisible);
  };

  const changeActiveChannel = (channelId) => {
    setActiveChannel(channelId);
  };

  const changeActiveUser = (userId) => {
    setActiveUser(userId);
  };

  return (
    <SideBarContainer activeKey={activeUser || activeChannel}>
      <SearchBox />
      {channelIds ? (
        <SubMenu
          key="sub1"
          title={(
            <span>
              <Icon type="usergroup-add" />
              <span>
                Channels <Icon type="plus" onClick={toggleModal} />
              </span>
            </span>
)}
        >
          {channelIds.map(channelId => (
            <Menu.Item onClick={() => changeActiveChannel(channelId)} key={channelId}>
              {channelsMap[channelId].name}{' '}
              <span>
                {!channelsMap[channelId].unreadMessages ? (
                  <span />
                ) : (
                  <UnreadCount>{channelsMap[channelId].unreadMessages}</UnreadCount>
                )}
              </span>
            </Menu.Item>
          ))}
        </SubMenu>
      ) : (
        ''
      )}
      <SubMenu
        key="sub2"
        title={(
          <span>
            <Icon type="user" />
            <span>People</span>
          </span>
)}
      >
        {allUserIds
          ? allUserIds.map(userId => (
            <Menu.Item onClick={() => changeActiveUser(userId)} key={userId}>
              {allUsersMap[userId].username} <Status online={allUsersMap[userId].online} />
            </Menu.Item>
          ))
          : ''}
      </SubMenu>
      <AddChannelModal visible={channelModalIsVisible} toggleModal={toggleModal} />
    </SideBarContainer>
  );
};

export default Sidebar;
