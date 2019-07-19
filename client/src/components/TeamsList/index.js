import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useHomeContext } from '../../context/HomeContext';
import CreateTeamModal from '../CreateTeamModal';
import AddUserToTeamModal from '../AddUserToTeamModal';
import TeamUserListModal from '../TeamUserListModal';

const TeamCards = styled.div`
  display: flex;
  overflow-x: auto;
`;
const TeamCard = styled.div`
  cursor: pointer;
  height: 250px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2em;
  font-size: 25px;
  background-color: #eeeeee;
`;

const TeamsList = () => {
  const [redirectPath, setRedirect] = useState(null);
  const {
    user, setActiveTeam, teamsMap, teamIds, fetchTeams,
  } = useHomeContext();
  const [createTeamModalVisibility, setCreateTeamModalVisibility] = useState(false);
  const handleClick = (teamId) => {
    setActiveTeam(teamId);
    setRedirect('/home');
  };
  useEffect(() => {
    fetchTeams(user._id);
  }, [user, fetchTeams]);
  if (redirectPath) {
    return <Redirect to={redirectPath} />;
  }
  const toggleCreateModalVisibility = () => {
    setCreateTeamModalVisibility(!createTeamModalVisibility);
  };

  return (
    <div>
      <h1>Switch Teams</h1>
      <TeamCards>
        <TeamCard onClick={toggleCreateModalVisibility}>Create New</TeamCard>
        {teamIds.map(teamId => (
          <TeamCard key={teamId}>
            <button type="button" onClick={() => handleClick(teamId)}>
              {teamsMap[teamId].name}
            </button>
            <div
              role="button"
              onKeyDown={() => {}}
              tabIndex={0}
              type="button"
              onClick={() => setActiveTeam(teamId)}
              style={{ backgroundColor: 'rgba(0,0,0,0)', border: '0' }}
            >
              {teamsMap[teamId].admins.indexOf(user._id) < 0 ? (
                ''
              ) : (
                <AddUserToTeamModal teamId={teamId} />
              )}
              <TeamUserListModal teamId={teamId} />
            </div>
          </TeamCard>
        ))}
      </TeamCards>
      <CreateTeamModal
        visible={createTeamModalVisibility}
        handleCancel={toggleCreateModalVisibility}
      />
    </div>
  );
};

export default TeamsList;
