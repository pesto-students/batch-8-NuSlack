import React, { useState } from 'react';
import { Drawer, Button, Tooltip } from 'antd';
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
  background-image: url(${props => (props.avatarUrl ? props.avatarUrl : '')});
  background-size: cover;
  font-weight: bold;
  .overlay {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #555555;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;
const TeamsDrawer = () => {
  const { setActiveTeam, teamsMap, teamIds } = useHomeContext();
  const [visible, setVisible] = useState(false);
  const [createTeamModalIsVisible, setCreateTeamModalVisibility] = useState(false);
  const toggleCreateTeamModal = () => setCreateTeamModalVisibility(!createTeamModalIsVisible);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Teams
      </Button>
      <Drawer
        title="Teams"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <TeamCard onClick={() => setCreateTeamModalVisibility(true)}>Create Team</TeamCard>
        {teamIds.map(teamId => (
          <Tooltip placement="left" title={teamsMap[teamId].name}>
            <TeamCard
              avatarUrl={teamsMap[teamId].avatarUrl}
              key={teamId}
              onClick={() => setActiveTeam(teamId)}
            />
          </Tooltip>
        ))}
      </Drawer>
      <CreateTeamModal visible={createTeamModalIsVisible} handleCancel={toggleCreateTeamModal} />
    </div>
  );
};

export default TeamsDrawer;
