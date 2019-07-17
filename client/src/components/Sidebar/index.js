import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import { useHomeContext } from '../../context/HomeContext';
import AddChannelModal from '../AddChannelModal';

const { SubMenu } = Menu;
const { Sider } = Layout;
const Status = styled.div`
  display: inline-block;
  background-color: ${props => (props.online === true ? 'green' : '#cccccc')}
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
const SideBarContainer = ({ children }) => (
  <Sider
    width={300}
    style={{
      overflow: 'hidden',
      height: '100%',
    }}
    breakpoint="sm"
    collapsible
    theme="light"
  >
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {children}
    </Menu>
  </Sider>
);
SideBarContainer.propTypes = {
  children: PropTypes.node.isRequired,
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
  } = useHomeContext();

  useEffect(() => {
    if (user._id) {
      fetchChannels(user._id);
      fetchUsers();
    }
  }, [user, fetchChannels, fetchUsers]);

  const toggleModal = () => {
    setChannelModalIsVisible(!channelModalIsVisible);
  };

  const changeActiveChannel = (channelId) => {
    setActiveChannel(channelId);
  };
  return (
    <SideBarContainer>
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
        {channelIds ? channelIds.map(channelId => (
          <Menu.Item
            onClick={() => changeActiveChannel(channelId)}
            key={channelId}
          >
            {channelsMap[channelId].name}{' '}
            <span>
              {!channelsMap[channelId].unreadMessages ? (
                <span />
              ) : (
                <UnreadCount>
                  {channelsMap[channelId].unreadMessages}
                </UnreadCount>
              )}
            </span>
          </Menu.Item>
        )) : ''}
      </SubMenu>
      <SubMenu
        key="sub2"
        title={(
          <span>
            <Icon type="user" />
            <span>People</span>
          </span>
        )}
      >
        {allUserIds ? allUserIds.map(userId => (
          <Menu.Item onClick={() => changeActiveChannel(userId)} key={userId}>
            {allUsersMap[userId].username}{' '}
            <Status online={allUsersMap[userId].online} />
          </Menu.Item>
        )) : ''}
      </SubMenu>
      <AddChannelModal
        visible={channelModalIsVisible}
        toggleModal={toggleModal}
      />
    </SideBarContainer>
  );
};

export default Sidebar;
