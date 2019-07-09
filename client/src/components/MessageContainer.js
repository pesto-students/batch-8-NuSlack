import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 90px;
  overflow-y: auto;
  height: calc(100vh - 185px);
  li {
    margin: 2rem 0;
    list-style: none;
  }
  p {
    margin-top: 0.25rem;
  }
`;
const TimestampSpan = styled.span`
  color: darkgrey;
`;
const TeamMember = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;
export default class MessageContainer extends Component {
  render() {
    return (
      <Container>
        <ul>
          <li>
            <TeamMember>Team Member 1</TeamMember>
            <TimestampSpan>Timestamp</TimestampSpan>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              distinctio inventore libero, quae, adipisci corrupti minima
              maiores aperiam necessitatibus ipsa dolores quam ut tempore ipsum!
              Mollitia ex possimus harum corporis!
            </p>
          </li>
          <li>
            <TeamMember>Team Member 2</TeamMember>
            <TimestampSpan>Timestamp</TimestampSpan>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              distinctio inventore libero, quae, adipisci corrupti minima
              maiores aperiam necessitatibus ipsa dolores quam ut tempore ipsum!
              Mollitia ex possimus harum corporis!
            </p>
          </li>
          <li>
            <TeamMember>Team Member 3</TeamMember>
            <TimestampSpan>Timestamp</TimestampSpan>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              distinctio inventore libero, quae, adipisci corrupti minima
              maiores aperiam necessitatibus ipsa dolores quam ut tempore ipsum!
              Mollitia ex possimus harum corporis!
            </p>
          </li>
          <li>
            <TeamMember>Team Member 7</TeamMember>
            <TimestampSpan>Timestamp</TimestampSpan>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              distinctio inventore libero, quae, adipisci corrupti minima
              maiores aperiam necessitatibus ipsa dolores quam ut tempore ipsum!
              Mollitia ex possimus harum corporis!
            </p>
          </li>
        </ul>
      </Container>
    );
  }
}
