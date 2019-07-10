import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, Avatar, Input, Skeleton, List } from 'antd';
import ChatInputBox from '../ChatInputBox';
import styled from 'styled-components';

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
    href: '#',
    title: `username ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
const GreenHeader = styled(Header)`
  background-color: green;
  color: white;
`;
const ChatComponent = () => {
  const [loading, setLoading] = useState(false);

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
                dataSource={listData}
                renderItem={item => (
                  <List.Item
                    key={item.title}
                    actions={
                      !loading && [
                        <IconText type="star-o" text="156" />,
                        <IconText type="like-o" text="156" />,
                        <IconText type="message" text="2" />,
                      ]
                    }
                  >
                    <Skeleton loading={loading} active avatar>
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                      />
                      {item.content}
                    </Skeleton>
                  </List.Item>
                )}
              />
            </div>
          </ChatHistory>
          <ChatInputBox />
        </ChatBox>
      </Content>
    </>
  );
};

export default ChatComponent;
