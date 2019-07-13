import React from 'react';
import styled from 'styled-components';
import AddChannelForm from "../AddChannelForm"
import { Modal, Form, Input, Checkbox, Button } from 'antd';

const StyledModal = styled(Modal)`

`;
const AddChannelModal = props => {
  const { visible, toggleModal } = props;

  const createChannel = e => {
    e.preventDefault();
  };
  return (
    <StyledModal
      visible={visible}
      title="Add Channel"
      footer={null}
      onCancel={toggleModal}
    >
      <AddChannelForm closeModal={toggleModal}/>
    </StyledModal>
  );
};

export default AddChannelModal;
