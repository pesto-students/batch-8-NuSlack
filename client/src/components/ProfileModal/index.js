import React from 'react';
import styled from 'styled-components';

import { Modal } from 'antd';

const StyledModal = styled(Modal)`
  img {
    height: 10em;
    width: 10em;
  }
  .ant-modal-body {
    display: flex;
    flex-direction: row;
  }
  div {
    margin-left: 1em;
  }
`;
const Status = styled.div`
display: inline-block;
background-color: ${props => (props.online === true ? 'green' : 'grey')}
border-radius: 50%;
height: 0.5em;
width: 0.5em;`;
const ProfileModal = props => {
  const { visible, toggleModal, userData } = props;
  return (
    <StyledModal
      visible={visible}
      title="Profile"
      okText="Send Message"
      onCancel={toggleModal}
      onOk={toggleModal}
    >
      <img src={userData.avatar} alt="userImage" />
      <div>
        <h1>
          {userData.title} <Status online />
        </h1>
        <h2>{userData.tagLine}</h2>
      </div>
    </StyledModal>
  );
};

export default ProfileModal;
