import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {
  const [userChannels, setUserChannels] = useState([]);
  const [groupChannels, setGroupChannels] = useState([]);
  useEffect(() => {
    setGroupChannels([
      { name: 'channel1', id: '123123' },
      { name: 'channel2', id: '123122' },
    ]);
    setUserChannels([
      { name: 'Person1', id: '1223' },
      { name: 'Person2', id: '1122' },
    ]);
  }, []);
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
              Channels
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
    </Sider>
  );
};

export default Sidebar;
