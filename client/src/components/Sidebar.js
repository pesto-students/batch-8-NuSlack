import React, { Fragment } from "react";
import styled from "styled-components";
import Channels from "./Channels";
import Messages from "./Messages";

const Container = styled.div`
  height: 100%;
  background: rebeccapurple;
  padding: 1rem;
  color: white;
  box-sizing: border-box;
`;
const SidebarHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 25px;
  font-size: 1.2rem;
`;

const MainHeading = styled.h1`
  font-weight: 900;
  font-size: 1.3rem;
`;
const MemberNameContainer = styled.div`
  font-size: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 0.5rem;
`;
export const Status = styled.span`
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 100%;
  background-color: green;
  margin-right: 0.5rem;
  display: inline-block;
`;
function Sidebar() {
  return (
    <Container>
      <SidebarHeader>
        <MainHeading>Lorem Ipsum</MainHeading>
        <div>
          <i className="far fa-bell" />
        </div>
        <MemberNameContainer>
          <Status />
          Member 1
        </MemberNameContainer>
      </SidebarHeader>
      <Fragment>
        <Channels />
        <Messages />
      </Fragment>
    </Container>
  );
}

export default Sidebar;
