import React from 'react';
import styled from 'styled-components';
import AddChannelForm from "../AddChannelForm"
import { Modal } from 'antd';

const StyledModal = styled(Modal)`

`;
const AddChannelModal = props => {
  const { visible, toggleModal } = props;

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
