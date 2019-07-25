import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Icon, Button } from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import CreateTeamModal from '../CreateTeamModal';
import AddUserToTeamModal from '../AddUserToTeamModal';
import TeamUserListModal from '../TeamUserListModal';

const { Meta } = Card;
const TeamCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2em;
  .card {
    :hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
    }
  }
  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
`;
const StyledCard = styled(Card)`
  margin: 1em !important;
  width: 290px;
  .teamImage {
    height: 290px;
    object-fit: cover;
  }

  .ant-card-hoverable {
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.29);
    }
  }
  @media only screen and (max-width: 600px) {
  }
  :hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
  }
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

  localStorage.removeItem('activeTeam');

  return (
    <div>
      <TeamCards>
        <div
          className="card"
          role="presentation"
          style={{
            width: '290px',
            height: '432px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#eeeeee',
            cursor: 'pointer',
            margin: '1em',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={toggleCreateModalVisibility}
        >
          <Icon type="plus" style={{ fontSize: '75px' }} />
          <span style={{ fontSize: '25px' }}>Create Team</span>
        </div>
        {teamIds.map(teamId => (
          <StyledCard
            key={teamId}
            cover={(
              <img
                onClick={() => handleClick(teamId)}
                onKeyPress={() => {}}
                role="presentation"
                alt="TeamImage"
                className="teamImage"
                src={teamsMap[teamId].avatarUrl}
              />
)}
            hoverable
            actions={[
              <AddUserToTeamModal
                buttonStyle={{ backgroundColor: 'rgba(0,0,0,0)', border: '0px', boxShadow: 'none' }}
                disabled={!(teamsMap[teamId].admins.indexOf(user._id) >= 0)}
                onClick={() => {
                  setActiveTeam(teamId);
                }}
                teamId={teamId}
              />,
              <Button
                style={{ backgroundColor: 'rgba(0,0,0,0)', border: '0px', boxShadow: 'none' }}
                role="presentation"
                onClick={() => {
                  setActiveTeam(teamId);
                  toggleUserListModalVisibility();
                }}
              >
                Users
              </Button>,
            ]}
          >
            <Meta
              onClick={() => handleClick(teamId)}
              title={(
                <h2 style={{ textAlign: 'center', fontSize: '1.8em', marginBottom: 0 }}>
                  {teamsMap[teamId].name}
                </h2>
)}
            />
          </StyledCard>
        ))}

        <div />
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
