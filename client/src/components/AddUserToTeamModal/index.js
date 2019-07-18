import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import AddUserToTeamForm from '../AddToTeamForm';

const AddUserToTeamModal = () => {
  const [visible, setVisible] = useState(false);
  const { activeTeam, teamsMap } = useHomeContext();
  const { name } = teamsMap[activeTeam] || '';
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add to Team
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

AddUserToTeamModal.propTypes = {};
AddUserToTeamModal.defaultProps = {};

export default AddUserToTeamModal;
