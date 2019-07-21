import React from 'react';
import styled from 'styled-components';
import InvitationsList from '../InvitationsList';
import TeamsList from '../TeamsList';
import { useHomeContext } from '../../context/HomeContext';

const TeamsPageContainer = styled.div`
  padding: 5vw;
`;
const TeamsPage = () => {
  const { user } = useHomeContext();
  return (
    <TeamsPageContainer>
      <h1>{user.username}</h1>
      <TeamsList />
      <InvitationsList />
    </TeamsPageContainer>
  );
};

export default TeamsPage;
