import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Icon, Avatar, Skeleton, List,
} from 'antd';
import styled from 'styled-components';
import { ChatBox, ChatHistory } from './style';
import ChatInputBox from '../ChatInputBox';
import ProfileModal from '../ProfileModal';
import { useHomeContext } from '../../context/HomeContext';
import ChatHeader from '../ChatHeader';
import { ONE_MINUTE } from '../../constants/time';

const { Content } = Layout;
const StyledChatHistory = styled(ChatHistory)`
  .ant-list-vertical {
    margin-bottom: 0px !important;
  }
  .ant-list-vertical .ant-list-item-meta-title {
    margin-bottom: 0px !important;
  }
  .ant-list-vertical .ant-list-item-meta {
    margin-bottom: 0px !important;
  }
`;
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
  const mergedMessages = messages.reduce((acc, message, index) => {
    if (!acc.length) {
      acc.push({ ...message });
    } else if (
      message.sender._id === acc[acc.length - 1].sender._id
        && new Date(message.timestamp) - new Date(messages[index - 1].timestamp) < ONE_MINUTE
    ) {
      acc[acc.length - 1].message += `<br/>${message.message}`;
      return acc;
    } else {
      acc.push({ ...message });
    }
    return acc;
  }, []) || [];
  const toggleModal = (user) => {
    if (user) {
      if (allUsersMap[user._id]) {
        setActiveModalProfile({ ...allUsersMap[user._id], found: true });
      } else {
        setActiveModalProfile(user);
      }
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
          padding: '0 0',
          margin: 0,
          minHeight: 280,
        }}
      >
        <ChatBox>
          <StyledChatHistory>
            <div>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={mergedMessages}
                renderItem={item => (
                  <List.Item
                    key={item.sender._id}
                    actions={
                      !loading
                      && [
                        // <IconText type="like-o" text={item.likes ? String(item.likes) : '0'} />,
                      ]
                    }
                  >
                    <Skeleton loading={loading} active avatar>
                      <List.Item.Meta
                        avatar={<Avatar size={50} src={item.sender.avatar} />}
                        title={(
                          <div>
                            <div>
                              <a href={item.sender.href}>
                                {item.sender.name || item.sender.username}
                              </a>{' '}
                              <span style={{ fontSize: '0.7em', color: '#888888' }}>
                                {' '}
                                {item.timestamp
                                  ? new Date(item.timestamp)
                                    .toLocaleString()
                                    .split(', ')
                                    .reverse()
                                    .join(', ')
                                  : ''}
                              </span>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: item.message }} />
                          </div>
)}
                        onClick={() => toggleModal(item.sender)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
              <div ref={lastItemRef} />
            </div>
          </StyledChatHistory>
          <ChatInputBox />
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
