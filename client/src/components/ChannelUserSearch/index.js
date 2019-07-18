import React, { useState, useEffect, useRef } from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const AutocompleteContainer = styled.div`
  .certain-category-search.ant-select-auto-complete
    .ant-input-affix-wrapper
    .ant-input-suffix {
    right: 12px;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
    color: #666;
    font-weight: bold;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
    border-bottom: 1px solid #f6f6f6;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu-item {
    padding-left: 16px;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
    text-align: center;
    cursor: default;
  }

  .certain-category-search-dropdown .ant-select-dropdown-menu {
    max-height: 300px;
  }

  .certain-search-item-searchText {
    position: absolute;
    color: #999;
    right: 16px;
  }

  .certain-category-search.ant-select-focused .certain-category-icon {
    color: #108ee9;
  }

  .certain-category-icon {
    color: #6e6e6e;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 16px;
  }
`;

const { Option, OptGroup } = AutoComplete;

const generateOptions = (dataSource, searchText, handleSearchClick, user) => (
  dataSource.map(group => (
    <OptGroup key={group.title}>
      {group.children
        .filter(item => item.title.toLowerCase().indexOf(searchText) >= 0)
        .map(opt => (
          <Option
            key={opt.title}
            value={opt.title}
            onClick={() => handleSearchClick(opt._id)}
          >
            {opt.title}
            <span className="certain-search-item-searchText">
              {opt.users && opt.users.indexOf(user._id) < 0 ? <span style={{ float: 'right' }}>+JOIN</span> : ''}
            </span>
          </Option>
        ))}
    </OptGroup>
  ))
);
const SearchBox = () => {
  const [channelsSearchMap, setChannelsSearchMap] = useState({});
  const [searchText, setSearchText] = useState('');
  const updateChannelsSearchMapRef = useRef();
  const {
    allUsersMap,
    channelsMap,
    allUserIds,
    channelIds,
    setActiveChannel,
    user,
    addChannel,
    activeTeam,
  } = useHomeContext();
  const dataSource = [];
  dataSource.push({
    title: 'Users',
    children: allUserIds.map(userId => ({
      ...allUsersMap[userId],
      title: allUsersMap[userId].username,
    })),
  });
  dataSource.push({
    title: 'Channels',
    children: Object.keys(channelsSearchMap).map(channelId => ({
      ...channelsSearchMap[channelId],
      title: channelsSearchMap[channelId].name || 'UnknownChannelName',
    })),
  });
  const handleSearchClick = (channelId) => {
    if (channelIds.indexOf(channelId) >= 0 && channelsMap[channelId]) {
      setActiveChannel(channelId);
    } else {
      axios
        .post(`${serverConfig.SERVER_BASE_URL}/channels/${channelId}/add-user/${user._id}`)
        .then((resp) => {
          addChannel(resp.data);
          setActiveChannel(resp.data._id);
        });
    }
  };
  useEffect(() => {
    axios
      .get(`${serverConfig.SERVER_BASE_URL}/channels`, {
        params: { isPrivate: false, teamId: activeTeam },
      })
      .then((resp) => {
        const publicChannelsMap = resp.data.reduce((acc, channel) => {
          acc[channel._id] = channel;
          return acc;
        }, {});
        updateChannelsSearchMapRef.current(publicChannelsMap);
      });
  }, [channelIds, activeTeam]);
  const updateChannelsSearchMap = (publicChannelsMap) => {
    setChannelsSearchMap(() => ({ ...channelsMap, ...publicChannelsMap }));
  };
  updateChannelsSearchMapRef.current = updateChannelsSearchMap;
  const options = generateOptions(dataSource, searchText, handleSearchClick, user);
  return (
    <AutocompleteContainer
      className="certain-category-search-wrapper"
      style={{ width: 250, margin: 'auto' }}
    >
      <AutoComplete
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 300 }}
        size="large"
        style={{ width: '100%' }}
        dataSource={options}
        placeholder="input here"
        optionLabelProp="value"
        value={searchText || ''}
        onChange={(e) => {
          setSearchText(e);
        }}
      >
        <Input
          suffix={(
            <span>
              <Icon
                type="close"
                onClick={() => {
                  setSearchText('');
                }}
                className="certain-category-icon"
                style={{ marginRight: '5px' }}
              />
              <Icon type="search" className="certain-category-icon" />
            </span>
          )}
        />
      </AutoComplete>
    </AutocompleteContainer>
  );
};

export default SearchBox;
