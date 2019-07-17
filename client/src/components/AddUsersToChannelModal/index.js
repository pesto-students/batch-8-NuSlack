import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'antd';
import AddUserToChannelForm from '../AddUserToChannelForm';

const StyledModal = styled(Modal)`
  background-color: white;
`;
const AddUsersToChannelModal = (props) => {
  const { visible, toggleModal } = props;

  return (
    <StyledModal
      visible={visible}
      title="Add User"
      footer={null}
      onCancel={toggleModal}
    >
      <AddUserToChannelForm closeModal={toggleModal} />
    </StyledModal>
  );
};
AddUsersToChannelModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default AddUsersToChannelModal;
