import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import CreateTeamModal from '../CreateTeamModal';
import AddUserToTeamModal from '../AddUserToTeamModal';
import TeamUserListModal from '../TeamUserListModal';

const TeamCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2em;
  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
`;
const TeamCard = styled.div`
  height: 235px;
  min-width: 235px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1.5em;
  margin-top: 1.5em;
  font-size: 25px;
  background-image: url(${props => (props.avatarUrl ? props.avatarUrl : '')});
  background-size: cover;
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
    button {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0);
      border: none;
      box-shadow: none;
      font-weight: bold;
      color: #555555;
      font-size: 0.8em;
      :hover {
        color: #111111;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    height: 140px;
    min-width: 140px;
    font-size: 14px;
    margin: 0.5em;
  }
`;
const CardButtons = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
`;

const TeamsList = () => {
  const [redirectPath, setRedirect] = useState(null);
  const {
    user, setActiveTeam, teamsMap, teamIds, fetchTeams,
  } = useHomeContext();
  const [createTeamModalVisibility, setCreateTeamModalVisibility] = useState(false);
  const [userListModalVisibility, setUserListModalVisibility] = useState(false);
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

  const toggleUserListModalVisibility = () => {
    setUserListModalVisibility(!userListModalVisibility);
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.7em' }}>Teams</h1>
      <TeamCards>
        <TeamCard onClick={toggleCreateModalVisibility}>
          <div className="overlay">Create New</div>
        </TeamCard>
        {teamIds.map(teamId => (
          <TeamCard avatarUrl={teamsMap[teamId].avatarUrl} key={teamId}>
            <div className="overlay">
              <button type="button" onClick={() => handleClick(teamId)}>
                <div style={{ fontSize: '1.2em' }}>{teamsMap[teamId].name}</div>
              </button>
              <CardButtons
                className="teamLink"
                role="button"
                onKeyDown={() => {}}
                tabIndex={0}
                onClick={() => setActiveTeam(teamId)}
              >
                {teamsMap[teamId].admins.indexOf(user._id) >= 0 ? (
                  <AddUserToTeamModal teamId={teamId} />
                ) : (
                  ''
                )}
                <div>
                  <Button
                    type="primary"
                    onClick={toggleUserListModalVisibility}
                  >
                    Users
                  </Button>
                </div>
              </CardButtons>
            </div>
          </TeamCard>
        ))}
      </TeamCards>
      <TeamUserListModal
        visible={userListModalVisibility}
        handleCancel={toggleUserListModalVisibility}
      />
      <CreateTeamModal
        visible={createTeamModalVisibility}
        handleCancel={toggleCreateModalVisibility}
      />
    </div>
  );
};

export default TeamsList;
