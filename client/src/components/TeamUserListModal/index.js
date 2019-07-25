import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Modal, Button, notification, Spin,
} from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const successfulMessage = 'User removed from team';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: successfulMessage,
  });
};
const StyledModal = styled(Modal)``;
const UsersInTeamModal = ({ visible, handleCancel }) => {
  const { SERVER_BASE_URL } = serverConfig;
  const [allTeamUsers, setAllTeamUsers] = useState([]);
  const { activeTeam, teamsMap, user } = useHomeContext();
  const fetchAllUsers = useRef((activeTeamId) => {
    axios.get(`${SERVER_BASE_URL}/users`, { params: { teams: activeTeamId } }).then((resp) => {
      setAllTeamUsers(resp.data);
    });
  });
  const kickUser = (userId) => {
    axios
      .post(`${SERVER_BASE_URL}/teams/${activeTeam}/remove-user/${userId}`, {
        params: { teams: activeTeam },
      })
      .then(() => {
        openNotificationWithIcon('success');
        fetchAllUsers.current(activeTeam);
      });
  };
  useEffect(() => {
    setAllTeamUsers([]);
    fetchAllUsers.current(activeTeam);
  }, [activeTeam, SERVER_BASE_URL]);
  const ListOfUsers = () => {
    if (!teamsMap[activeTeam]) {
      return <Spin spinning />;
    }
    if (!Object.keys(allTeamUsers).length) {
      return <Spin spinning />;
    }

    const isAdmin = teamsMap[activeTeam].admins.indexOf(user._id) >= 0;
    const listOfUserObjects = allTeamUsers;
    return listOfUserObjects.map(userObject => (
      <div
        key={userObject.username}
        style={{ height: '2.5em', display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <img
            src={userObject.avatar}
            style={{ marginRight: '0.5em', height: '2em', width: '2em' }}
            alt="avatar"
          />
          {userObject.username}
        </div>
        {teamsMap[activeTeam].admins.indexOf(userObject._id) >= 0 ? ' (Admin) ' : ''}
        {isAdmin && userObject._id !== user._id ? (
          <Button onClick={() => kickUser(userObject._id)}>Kick User</Button>
        ) : (
          ''
        )}
      </div>
    ));
  };
  return (
    <StyledModal onCancel={handleCancel} visible={visible} title="Users" footer={null}>
      {ListOfUsers()}
    </StyledModal>
  );
};
UsersInTeamModal.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default UsersInTeamModal;
