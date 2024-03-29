import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { useHomeContext } from '../../context/HomeContext';

const StyledModal = styled(Modal)``;
const UsersInChannelModal = (props) => {
  const { visible, toggleModal } = props;
  const {
    activeChannel, channelsMap, allUsersMap, removeUserFromChannel, user,
  } = useHomeContext();
  const kickUser = (userId) => {
    removeUserFromChannel({ channelId: activeChannel, userId });
  };
  const ListOfUsers = () => {
    if (!channelsMap[activeChannel]) {
      return 'Loading..';
    }
    if (!Object.keys(allUsersMap).length) {
      return 'Fetching users';
    }
    if (!channelsMap[activeChannel].users) {
      return 'You are in User chat';
    }

    const isAdmin = channelsMap[activeChannel].admins.indexOf(user._id) >= 0;
    const listOfUserObjects = channelsMap[activeChannel].users
      .filter(userId => allUsersMap[userId])
      .map(userId => allUsersMap[userId]);
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
        {channelsMap[activeChannel].admins.indexOf(userObject._id) >= 0 ? ' (Admin) ' : ''}
        {isAdmin && userObject._id !== user._id ? (
          <Button onClick={() => kickUser(userObject._id)}>Kick User</Button>
        ) : (
          ''
        )}
      </div>
    ));
  };
  return (
    <StyledModal visible={visible} title="Users" footer={null} onCancel={toggleModal}>
      {ListOfUsers()}
    </StyledModal>
  );
};
UsersInChannelModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default UsersInChannelModal;
