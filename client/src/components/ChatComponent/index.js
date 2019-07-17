import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Layout, Icon, Avatar, Skeleton, List, Button,
} from 'antd';
import { ChatBox, ChatHistory, GreenHeader } from './style';
import ChatInputBox from '../ChatInputBox';
import ProfileModal from '../ProfileModal';
import { useHomeContext } from '../../context/HomeContext';
import AddUsersToChannelModal from '../AddUsersToChannelModal';
import ChannelUserListModal from '../ChannelUserListModal';
import { serverConfig } from '../../config';

const { Content } = Layout;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

IconText.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const defaultUser = {};

const ChatComponent = () => {
  const { SERVER_BASE_URL } = serverConfig;
  const [loading] = useState(false);
  const [modalIsVisible, setModal] = useState(false);
  const [activeChannelName, setActiveChannelName] = useState('Loading');
  const [activeModalProfile, setActiveModalProfile] = useState(defaultUser);
  const [addUserModalIsVisible, setAddUserModalIsVisible] = useState(false);
  const [userListModalIsVisible, setUserListModalIsVisible] = useState(false);
  const lastItemRef = useRef(null);
  const updateChannelRef = useRef();
  const {
    user,
    activeChannel,
    channelsMap,
    fetchMessages,
    allUsersMap,
    removeChannel,
    setActiveChannel,
    channelIds,
  } = useHomeContext();

  const messages = (
    channelsMap && channelsMap[activeChannel] && channelsMap[activeChannel].messages
  ) || [];
  const toggleModal = (userProfile) => {
    if (userProfile) {
      setActiveModalProfile(userProfile);
    } else {
      setActiveModalProfile(defaultUser);
    }
    setModal(!modalIsVisible);
  };
  const updateChannel = () => {
    if (activeChannel) {
      fetchMessages(activeChannel);
      if (channelsMap[activeChannel]) {
        setActiveChannelName(channelsMap[activeChannel].name);
      } else if (allUsersMap[activeChannel]) {
        setActiveChannelName(allUsersMap[activeChannel].username);
      }
    }
  };
  updateChannelRef.current = updateChannel;
  useEffect(() => {
    updateChannelRef.current();
  }, [activeChannel, fetchMessages]);

  useEffect(() => {
    lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [channelsMap]);

  const handleLeaveChannel = () => {
    axios
      .post(`${SERVER_BASE_URL}/channels/${activeChannel}/remove-user/${user._id}`)
      .then((resp) => {
        removeChannel(resp.data._id);
        setActiveChannel(channelIds[0]);
      });
  };

  const toggleAddUserModal = () => {
    setAddUserModalIsVisible(!addUserModalIsVisible);
  };

  const toggleUserListModal = () => {
    setUserListModalIsVisible(!userListModalIsVisible);
  };

  return (
    <>
      <GreenHeader className="channel-detail">
        {activeChannelName}
        <span style={{ float: 'right' }}>
          <Button onClick={toggleUserListModal} style={{ marginRight: '5px' }}>
            Users
          </Button>
          <Button onClick={toggleAddUserModal} style={{ marginRight: '5px' }}>
            Add users
          </Button>
          <Button onClick={handleLeaveChannel}>Leave</Button>
        </span>
      </GreenHeader>
      <Content
        style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <ChatBox>
          <ChatHistory>
            <div>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={messages}
                renderItem={item => (
                  <List.Item
                    key={item.sender._id}
                    actions={
                      !loading && [
                        <IconText type="like-o" text={item.likes ? String(item.likes) : '0'} />,
                      ]
                    }
                  >
                    <Skeleton loading={loading} active avatar>
                      <List.Item.Meta
                        avatar={<Avatar src={item.sender.avatar} />}
                        title={
                          <a href={item.sender.href}>{item.sender.name || item.sender.username}</a>
                        }
                        onClick={() => toggleModal(item.sender)}
                        style={{ cursor: 'pointer' }}
                      />
                      {item.message}
                    </Skeleton>
                  </List.Item>
                )}
              />
              <div ref={lastItemRef} />
            </div>
          </ChatHistory>
          <ChatInputBox />
        </ChatBox>
        <ProfileModal
          toggleModal={() => toggleModal()}
          visible={modalIsVisible}
          userData={activeModalProfile}
        />
        <AddUsersToChannelModal toggleModal={toggleAddUserModal} visible={addUserModalIsVisible} />
        <ChannelUserListModal toggleModal={toggleUserListModal} visible={userListModalIsVisible} />
      </Content>
    </>
  );
};

export default ChatComponent;
