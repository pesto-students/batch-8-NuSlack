import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import {
  Tabs, Icon, Badge, notification,
} from 'antd';
import axios from 'axios';
import { serverConfig } from '../../config';
import InvitationsList from '../InvitationsList';
import TeamsList from '../TeamsList';
import MainHeader from '../MainHeader';
import { useHomeContext } from '../../context/HomeContext';

const { TabPane } = Tabs;
const TeamsPageContainer = styled.div`
  padding: 2vw 5vw;
  .tab-title {
    font-size: 20px;
  }
  @media only screen and (max-width: 600px) {
    .tab-title {
      font-size: 18px;
    }
  }
`;
const successFullAcceptMessage = 'Team joined successfully.';
const successFullRejectMessage = 'Invitation Rejected.';

const openNotificationWithIcon = (type, accepted) => {
  notification[type]({
    message: accepted ? successFullAcceptMessage : successFullRejectMessage,
  });
};
const TeamsPage = () => {
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

  if (!user || !user.username) {
    return <Redirect to="/" push />;
  }

  return (
    <div>
      <MainHeader />
      <TeamsPageContainer>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={(
              <span className="tab-title">
                <Icon type="database" />
                Teams
              </span>
)}
            key="1"
          >
            <TeamsList />
          </TabPane>
          <TabPane
            tab={(
              <span className="tab-title">
                <Icon type="download" />
                Invitations {invitations.length ? <Badge count={invitations.length} /> : ''}
              </span>
)}
            key="2"
          >
            <InvitationsList handleClick={handleClick} />
          </TabPane>
        </Tabs>
      </TeamsPageContainer>
    </div>
  );
};

export default TeamsPage;
