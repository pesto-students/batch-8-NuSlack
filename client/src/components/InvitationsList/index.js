import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, notification } from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const successFullAcceptMessage = 'Team joined successfully.';
const successFullRejectMessage = 'Invitation Rejected.';

const openNotificationWithIcon = (type, accepted) => {
  notification[type]({
    message: accepted ? successFullAcceptMessage : successFullRejectMessage,
  });
};
const InvitationCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2em;
  @media only screen and (max-width: 600px) {
    justify-content: center;
  }
`;
const InvitationCard = styled.div`
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

const InvitationsList = () => {
  const { SERVER_BASE_URL } = serverConfig;
  const [invitations, setInvitations] = useState([]);
  const { user, fetchTeams } = useHomeContext();
  const handleClick = (type, invitationId) => {
    axios.post(`${SERVER_BASE_URL}/invitations/${invitationId}/${type}`).then(() => {
      fetchTeams(user._id);
      axios
        .get(`${SERVER_BASE_URL}/invitations`, {
          params: { invitedUser: user._id, status: 'sent' },
        })
        .then((resp) => {
          setInvitations(resp.data);
          openNotificationWithIcon('success', type === 'accept');
        });
    });
  };
  useEffect(() => {
    if (user._id) {
      axios
        .get(`${SERVER_BASE_URL}/invitations`, {
          params: { invitedUser: user._id, status: 'sent' },
        })
        .then((resp) => {
          setInvitations(resp.data);
        });
    }
  }, [user, SERVER_BASE_URL]);

  return (
    <div>
      <h1>Invitations</h1>
      <InvitationCards>
        {invitations.map(invitation => (
          <InvitationCard avatarUrl={invitation.team.avatarUrl} key={invitation._id}>
            <div className="overlay">
              <button type="button" onClick={() => handleClick(invitation._id)}>
                <div style={{ fontSize: '1.2em' }}>{invitation.team.name}</div>
              </button>
              <CardButtons
                role="button"
                onKeyDown={() => {}}
                tabIndex={0}
              >
                <div style={{ borderRight: '1px solid' }}>
                  <Button type="primary" onClick={() => handleClick('accept', invitation._id)}>
                    Accept
                  </Button>
                </div>
                <div>
                  <Button type="primary" onClick={() => handleClick('reject', invitation._id)}>
                    Reject
                  </Button>
                </div>
              </CardButtons>
            </div>
          </InvitationCard>
        ))}
      </InvitationCards>
    </div>
  );
};

export default InvitationsList;
