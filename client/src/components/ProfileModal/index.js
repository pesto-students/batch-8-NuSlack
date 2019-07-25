import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useHomeContext } from '../../context/HomeContext';

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
    margin-left: 0.3em;
  }
  .ant-btn-primary {
    display: ${props => (props.disableSendMessage ? 'none' : 'inline')};
  }
`;
const Status = styled.div`
  display: inline-block;
  background-color: ${props => (props.online === true ? 'green' : 'grey')};
  border-radius: 50%;
  height: 0.5em;
  width: 0.5em;
`;

const ProfileModal = ({ visible, toggleModal, userData }) => {
  const { setActiveUser } = useHomeContext();
  return (
    <StyledModal
      visible={visible}
      title="Profile"
      okText="Send Message"
      onCancel={toggleModal}
      onOk={() => {
        toggleModal();
        setActiveUser(userData._id);
      }}
      disableSendMessage={!userData.found}
    >
      <img src={userData.avatar} alt="userImage" />
      <div>
        <h1>
          {userData.name || userData.username}{' '}
          <Status online={userData.online || !userData.found} />
        </h1>
        <h2>{userData.tagLine}</h2>
      </div>
    </StyledModal>
  );
};
ProfileModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    tagLine: PropTypes.string,
    _id: PropTypes.string,
    username: PropTypes.string,
    online: PropTypes.bool,
    avatar: PropTypes.string,
    name: PropTypes.string,
    found: PropTypes.bool,
  }).isRequired,
};
export default ProfileModal;
