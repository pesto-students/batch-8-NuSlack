import React, { Component } from "react";
import styled from "styled-components";
import fakeJSON from "../dummy.json";

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
  state = {
    messages: []
  };

  componentDidMount() {
    const dataObject = JSON.parse(JSON.stringify(fakeJSON));
    const { channels, messages } = dataObject;
    const channelMessages = this.state.messages.slice();
    Object.keys(channels).forEach(channelKey => {
      Object.keys(messages).forEach(messageKey => {
        if (messages[messageKey].channelId === channelKey) {
          channelMessages.push(messages[messageKey]);
        }
      });
    });
    this.setState({
      messages: [...this.state.messages, ...channelMessages]
    });
  }
  render() {
    console.log(this.state.messages);
    return (
      <Container>
        <ul>
          {this.state.messages.map(messageObject => (
            <li>
              <TeamMember>{messageObject.sender}</TeamMember>
              <TimestampSpan>{messageObject.timestamp}</TimestampSpan>
              <p>{messageObject.message}</p>
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
