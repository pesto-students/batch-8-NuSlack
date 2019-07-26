import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';
import PropTypes from 'prop-types';

const { Meta } = Card;

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
const InvitationsList = ({ handleClick, invitations }) => (
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
InvitationsList.propTypes = {
  invitations: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default InvitationsList;
