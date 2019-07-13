import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import AddChannelModal from '../AddChannelModal';
const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {
  const [channelModalIsVisible, setChannelModalIsVisible] = useState(false);

  const {
    user,
    setActiveChannel,
    channelIds,
    channelsMap,
    fetchChannels,
  } = useHomeContext();
  useEffect(() => {
    if (user._id) {
      fetchChannels(user._id);
    }
  }, [user]);
  const toggleModal = () => {
    setChannelModalIsVisible(!channelModalIsVisible);
  };
  const changeActiveChannel = channelId => {
    setActiveChannel(channelId);
    console.log(channelId);
  };
  console.log(channelIds, channelsMap)
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
              Channels <Icon type="plus" onClick={toggleModal} />
            </span>
          }
        >
          {channelIds.map(channelId => (
            <Menu.Item
              onClick={e => changeActiveChannel(channelId)}
              key={channelId}
            >
              {channelsMap[channelId].name}
            </Menu.Item>
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
          {([]).map(channel => (
            <Menu.Item
              onClick={e => changeActiveChannel(channel._id)}
              key={channel._id}
            >
              {channel.name}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <AddChannelModal
        visible={channelModalIsVisible}
        toggleModal={toggleModal}
      />
    </Sider>
  );
};

export default Sidebar;
