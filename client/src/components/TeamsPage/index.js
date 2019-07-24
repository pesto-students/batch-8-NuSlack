import React, { useState } from 'react';
import styled from 'styled-components';
import { Tabs, Icon, Badge } from 'antd';
import InvitationsList from '../InvitationsList';
import TeamsList from '../TeamsList';
import MainHeader from '../MainHeader';

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
const TeamsPage = () => {
  const [numberOfInvitations, setNumberOfInvitations] = useState(0);
  return (
    <div>
      <MainHeader />
      <TeamsPageContainer>
        <Tabs defaultActiveKey="2">
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
                Invitations {numberOfInvitations ? <Badge count={numberOfInvitations} /> : ''}
              </span>
)}
            key="2"
          >
            <InvitationsList setNumberOfInvitations={setNumberOfInvitations} />
          </TabPane>
        </Tabs>
      </TeamsPageContainer>
    </div>
  );
};

export default TeamsPage;
