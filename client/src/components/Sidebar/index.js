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
    setGroupChannels([
      { name: 'channel1', id: '123123' },
      { name: 'channel2', id: '123122' },
    ]);
    setUserChannels([
      { name: 'Person1', id: '1223' },
      { name: 'Person2', id: '1122' },
    ]);
    axios
      .get('http://localhost:8080/channels', {
        params: {
          users: user._id,
        },
      })
      .then(res => {
        const { data: channels } = res;
        console.log(channels);
        const userChannels = channels.filter(
          channel => channel.isGroup === false,
        );
        const groupChannels = channels.filter(
          channel => channel.isGroup === true,
        );
        setGroupChannels(groupChannels);
        setUserChannels(userChannels);
      });
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
          title={
            <span>
              <Icon type="laptop" />
              Channels <Icon type="plus" onClick={toggleModal}/>
            </span>
          }
        >
          {groupChannels.map(channel => (
            <Menu.Item key={channel.id}>{channel.name}</Menu.Item>
          ))}
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="user" />
              People
            </span>
          }
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
