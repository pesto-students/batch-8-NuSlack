import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import axios from 'axios';
import { useHomeContext } from '../../context/HomeContext';
import AddChannelModal from '../AddChannelModal'
const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {
  const [userChannels, setUserChannels] = useState([]);
  const [groupChannels, setGroupChannels] = useState([]);
  const [channelModalIsVisible, setChannelModalIsVisible] = useState(false);

  const { user } = useHomeContext();
  useEffect(() => {
    if (user._id) {
      axios
        .get('http://localhost:8080/channels', {
          params: {
            users: user._id,
          },
        })
        .then((res) => {
          const { data: channels } = res;
          console.log(channels);
          const receivedUserChannels = channels.filter(channel => channel.isGroup === false);
          const receivedGroupChannels = channels.filter(channel => channel.isGroup === true);
          setGroupChannels(receivedGroupChannels);
          setUserChannels(receivedUserChannels);
        });
    }
  }, [user]);

  const toggleModal = () => {
    console.log('asas')
    setChannelModalIsVisible(!channelModalIsVisible)
  }

  return (
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
        <SubMenu
          key="sub1"
          title={(
            <span>
              <Icon type="laptop" />
              Channels <Icon type="plus" onClick={toggleModal}/>
            </span>
)}
        >
          {groupChannels.map(channel => (
            <Menu.Item key={channel.id}>{channel.name}</Menu.Item>
          ))}
        </SubMenu>
        <SubMenu
          key="sub2"
          title={(
            <span>
              <Icon type="user" />
              People
            </span>
)}
        >
          {userChannels.map(channel => (
            <Menu.Item key={channel.id}>{channel.name}</Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <AddChannelModal visible={channelModalIsVisible} toggleModal={toggleModal}/>
    </Sider>
  );
};

export default Sidebar;
