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
`;
const InvitationCard = styled.div`
  cursor: pointer;
  height: 250px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1.5em;
  margin-top: 1.5em;
  font-size: 25px;
  background-color: #eeeeee;
  @media only screen and (max-width: 600px) {
    height: 150px;
    min-width: 150px;
    font-size:13px;
  }
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
          <InvitationCard key={invitation._id}>
            <button type="button" onClick={() => handleClick(invitation._id)}>
              {invitation.team.name}
            </button>
            <Button type="primary" onClick={() => handleClick('accept', invitation._id)}>
              Accept
            </Button>
            <Button type="primary" onClick={() => handleClick('reject', invitation._id)}>
              Reject
            </Button>
          </InvitationCard>
        ))}
      </InvitationCards>
    </div>
  );
};

export default InvitationsList;
