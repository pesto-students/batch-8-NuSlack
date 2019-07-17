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
    if (!channelsMap) {
      return 'Loading.';
    }
    if (!channelsMap[activeChannel]) {
      return 'Loading..';
    }
    if (!Object.keys(allUsersMap).length) {
      return '';
    }
    if (!channelsMap[activeChannel].users) {
      return 'You are in User chat';
    }
    const listOfUserObjects = channelsMap[activeChannel].users
      .filter(userId => userId !== user._id)
      .map(userId => allUsersMap[userId]);
    return listOfUserObjects.map(userObject => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {userObject.username}
        <Button onClick={() => kickUser(userObject._id)}>Kick User</Button>
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