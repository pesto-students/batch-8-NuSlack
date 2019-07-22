import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Icon, Avatar, Skeleton, List,
} from 'antd';
import { ChatBox, ChatHistory } from './style';
import ChatInputBox from '../ChatInputBox';
import ProfileModal from '../ProfileModal';
import { useHomeContext } from '../../context/HomeContext';
import ChatHeader from '../ChatHeader';
import TypingIndicator from '../TypingIndicator';

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
  const [loading] = useState(false);
  const [modalIsVisible, setModal] = useState(false);
  const [activeChannelName, setActiveChannelName] = useState('Loading');
  const [activeModalProfile, setActiveModalProfile] = useState(defaultUser);
  const lastItemRef = useRef(null);
  const updateChannelRef = useRef();
  const {
    user: loggedInUser,
    activeChannel,
    activeUser,
    channelsMap,
    allUsersMap,
    fetchChannelMessages,
    fetchUserMessages,
    userMessages,
  } = useHomeContext(); 

  let messages = [];
  if (activeChannel && channelsMap && channelsMap[activeChannel]) {
    messages = channelsMap[activeChannel].messages || [];
  } else if (activeUser && userMessages[activeUser]) {
    messages = userMessages[activeUser].messages || [];
  }
  const toggleModal = (user) => {
    if (user) {
      setActiveModalProfile(user);
    } else {
      setActiveModalProfile(defaultUser);
    }
    setModal(!modalIsVisible);
  };

  const updateChannel = () => {
    if (activeChannel) {
      fetchChannelMessages(activeChannel);
      if (channelsMap[activeChannel]) {
        setActiveChannelName(channelsMap[activeChannel].name);
      }
    }

    if (activeUser) {
      fetchUserMessages(loggedInUser._id, activeUser);
      if (allUsersMap[activeUser]) {
        setActiveChannelName(allUsersMap[activeUser].username);
      }
    }
  };

  updateChannelRef.current = updateChannel;
  useEffect(() => {
    updateChannelRef.current();
  }, [activeChannel, activeUser, fetchChannelMessages, fetchUserMessages, loggedInUser]);

  useEffect(() => {
    lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [channelsMap, userMessages]);
  return (
    <>
      <ChatHeader activeChannelName={activeChannelName} />
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
          <TypingIndicator isTyping={true} users={activeUser} />
        </ChatBox>
        <ProfileModal
          toggleModal={() => toggleModal()}
          visible={modalIsVisible}
          userData={activeModalProfile}
        />
      </Content>
    </>
  );
};

export default ChatComponent;
