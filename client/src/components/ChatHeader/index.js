import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Menu, Dropdown, Icon, Layout,
} from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

import AddUsersToChannelModal from '../AddUsersToChannelModal';
import ChannelUserListModal from '../ChannelUserListModal';

const { Header } = Layout;
const GreenHeader = styled(Header)`
  background-color: #ffba92;
  font-size: 18px;
  color: white;
`;
const ChatHeader = ({ activeChannelName }) => {
  const { SERVER_BASE_URL } = serverConfig;
  const [addUserModalIsVisible, setAddUserModalIsVisible] = useState(false);
  const [userListModalIsVisible, setUserListModalIsVisible] = useState(false);
  const {
    user, removeChannel, activeChannel, channelsMap,
  } = useHomeContext();
  const handleLeaveChannel = () => {
    axios
      .post(`${SERVER_BASE_URL}/channels/${activeChannel}/remove-user/${user._id}`)
      .then((resp) => {
        removeChannel(resp.data._id);
      });
  };

  const toggleAddUserModal = () => {
    setAddUserModalIsVisible(!addUserModalIsVisible);
  };

  const toggleUserListModal = () => {
    setUserListModalIsVisible(!userListModalIsVisible);
  };
  const isAdmin = channelsMap[activeChannel]
    ? channelsMap[activeChannel].admins.indexOf(user._id) >= 0
    : true;
  const menu = (
    <Menu>
      <Menu.Item onClick={toggleUserListModal}>User</Menu.Item>
      {isAdmin ? <Menu.Item onClick={toggleAddUserModal}>Add Users</Menu.Item> : ''}
      <Menu.Item onClick={handleLeaveChannel}>Leave Channel</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <GreenHeader className="channel-detail">
        {activeChannelName}
        <Dropdown overlay={menu}>
          <span style={{ float: 'right', cursor: 'pointer' }}>
            Settings <Icon type="down" />
          </span>
        </Dropdown>
      </GreenHeader>

      <AddUsersToChannelModal toggleModal={toggleAddUserModal} visible={addUserModalIsVisible} />
      <ChannelUserListModal toggleModal={toggleUserListModal} visible={userListModalIsVisible} />
    </div>
  );
};
ChatHeader.propTypes = {
  activeChannelName: PropTypes.string.isRequired,
};
export default ChatHeader;
