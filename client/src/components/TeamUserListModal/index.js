import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Modal, Button, notification } from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const successfulMessage = 'User removed from team';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: successfulMessage,
  });
};
const StyledModal = styled(Modal)``;
const UsersInTeamModal = () => {
  const { SERVER_BASE_URL } = serverConfig;
  const [visible, setVisible] = useState(false);
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
      return 'Loading..';
    }
    if (!Object.keys(allTeamUsers).length) {
      return 'No users';
    }

    const isAdmin = teamsMap[activeTeam].admins.indexOf(user._id) >= 0;
    const listOfUserObjects = allTeamUsers;
    return listOfUserObjects.map(userObject => (
      <div
        key={userObject.username}
        style={{ height: '2.5em', display: 'flex', justifyContent: 'space-between' }}
      >
        {userObject.username}
        {isAdmin && userObject._id !== user._id ? (
          <Button onClick={() => kickUser(userObject._id)}>Kick User</Button>
        ) : (
          ''
        )}
      </div>
    ));
  };
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Users
      </Button>
      <StyledModal onCancel={() => setVisible(false)} visible={visible} title="Users" footer={null}>
        {ListOfUsers()}
      </StyledModal>
    </div>
  );
};
UsersInTeamModal.propTypes = {};

export default UsersInTeamModal;
