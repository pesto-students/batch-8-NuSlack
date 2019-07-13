import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Avatar, Skeleton, List } from 'antd';
import styled from 'styled-components';
import ChatInputBox from '../ChatInputBox';
import ProfileModal from '../ProfileModal';
import { useHomeContext } from '../../context/HomeContext';

const { Header } = Layout;

const ChatBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 10px;
`;
const ChatHistory = styled.div`
  flex: 1;
`;

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

const listData = [];
for (let i = 0; i < 3; i += 1) {
  listData.push({
    _id: '123',
    href: '#',
    title: `username ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    tagLine: 'We supply a series of design principles.',
    content: 'message',
    likes: 123,
  });
}
const defaultUser = {
  _id: '',
  href: '',
  title: '',
  avatar: '',
  tagLine: '',
  content: '',
};
const GreenHeader = styled(Header)`
  background-color: green;
  color: white;
`;

const ChatComponent = () => {
  const [loading] = useState(false);
  const [modalIsVisible, setModal] = useState(false);
  const [activeModalProfile, setActiveModalProfile] = useState(defaultUser);

  const { activeChannel, channelsMap, fetchMessages } = useHomeContext();
  const toggleModal = user => {
    console.log('toggling modal', !modalIsVisible);
    setActiveModalProfile(user);
    setModal(!modalIsVisible);
  };
  useEffect(() => {
    if (activeChannel) {
      fetchMessages(activeChannel);
    }
  }, [activeChannel, fetchMessages]);
  return (
    <>
      <GreenHeader className="channel-detail">Channel Detail</GreenHeader>
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
                dataSource={channelsMap?channelsMap[activeChannel]?channelsMap[activeChannel].messages: []:[]}
                renderItem={item => (
                  <List.Item
                    key={item.sender.username}
                    actions={
                      !loading && [
                        <IconText
                          type="like-o"
                          text={item.likes ? String(item.likes) : "0"}
                        />,
                      ]
                    }
                  >
                    <Skeleton loading={loading} active avatar>
                      <List.Item.Meta
                        avatar={<Avatar src={item.sender.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        onClick={() => toggleModal(item)}
                        style={{ cursor: 'pointer' }}
                      />
                      {item.message}
                    </Skeleton>
                  </List.Item>
                )}
              />
            </div>
          </ChatHistory>
          <ChatInputBox />
        </ChatBox>
        <ProfileModal
          toggleModal={toggleModal}
          visible={modalIsVisible}
          userData={activeModalProfile}
        />
      </Content>
    </>
  );
};

export default ChatComponent;
