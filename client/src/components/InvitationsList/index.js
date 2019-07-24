import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, notification, Card } from 'antd';
import PropTypes from 'prop-types';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const { Meta } = Card;
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
  button {
    border: 0px;
    box-shadow: 0px;
    background-color: rgba(0, 0, 0, 0);
  }
`;
const InvitationsList = ({ setNumberOfInvitations }) => {
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
          setNumberOfInvitations(resp.data.length);
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
          setNumberOfInvitations(resp.data.length);
        });
    }
  }, [user, SERVER_BASE_URL, setNumberOfInvitations]);

  return (
    <div>
      <InvitationCards>
        {invitations.map(invitation => (
          <StyledCard
            key={invitation._id}
            cover={(
              <img
                onClick={() => handleClick(invitation._id)}
                onKeyPress={() => {}}
                role="presentation"
                alt="TeamImage"
                className="teamImage"
                src={invitation.team.avatarUrl}
              />
)}
            hoverable
            actions={[
              <Button onClick={() => handleClick('accept', invitation._id)}>Accept</Button>,
              <Button onClick={() => handleClick('reject', invitation._id)}>Reject</Button>,
            ]}
          >
            <Meta
              onClick={() => handleClick(invitation._id)}
              title={(
                <h2 style={{ textAlign: 'center', fontSize: '1.8em', marginBottom: 0 }}>
                  {invitation.team.name}
                </h2>
)}
            />
          </StyledCard>
        ))}
        {!invitations.length ? <h2>You have no invitations</h2> : ''}
      </InvitationCards>
    </div>
  );
};
InvitationsList.propTypes = {
  setNumberOfInvitations: PropTypes.func,
};
InvitationsList.defaultProps = {
  setNumberOfInvitations: () => {},
};
export default InvitationsList;
