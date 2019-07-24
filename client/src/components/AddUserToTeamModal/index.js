import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useHomeContext } from '../../context/HomeContext';
import AddUserToTeamForm from '../AddToTeamForm';

const AddUserToTeamModal = ({ onClick, disabled, buttonStyle }) => {
  const [visible, setVisible] = useState(false);
  const { activeTeam, teamsMap } = useHomeContext();
  const { name } = teamsMap[activeTeam] || '';
  return (
    <div>
      <Button
        style={buttonStyle}
        disabled={disabled}
        onClick={() => {
          onClick();
          setVisible(true);
        }}
      >
        Invite
      </Button>
      <Modal
        title={`Add to Team ${name}`}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <AddUserToTeamForm closeModal={() => setVisible(false)} />
      </Modal>
    </div>
  );
};

AddUserToTeamModal.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonStyle: PropTypes.shape({}),
};
AddUserToTeamModal.defaultProps = {
  onClick: () => {},
  disabled: false,
  buttonStyle: {},
};

export default AddUserToTeamModal;
