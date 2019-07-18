import React, { useState } from 'react';
import { Drawer, Icon } from 'antd';
import styled from 'styled-components';
import CreateTeamModal from '../CreateTeamModal';
import { useHomeContext } from '../../context/HomeContext';

const TeamCard = styled.div`
  height: 10em;
  width: 10em;
  margin-bottom: 1em;
  cursor: pointer;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const TeamsDrawer = () => {
  const { setActiveTeam, teamsMap, teamIds } = useHomeContext();
  const [visible, setVisible] = useState(false);
  const [createTeamModalIsVisible, setCreateTeamModalVisibility] = useState(false);
  const toggleCreateTeamModal = () => setCreateTeamModalVisibility(!createTeamModalIsVisible);
  return (
    <div>
      <Icon type="setting" onClick={() => setVisible(true)} />
      <Drawer
        title="Teams"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <TeamCard onClick={() => setCreateTeamModalVisibility(true)}>Create Team</TeamCard>
        {teamIds.map(teamId => (
          <TeamCard key={teamId} onClick={() => setActiveTeam(teamId)}>
            {teamsMap[teamId].name}
          </TeamCard>
        ))}
      </Drawer>
      <CreateTeamModal visible={createTeamModalIsVisible} handleCancel={toggleCreateTeamModal} />
    </div>
  );
};

export default TeamsDrawer;
