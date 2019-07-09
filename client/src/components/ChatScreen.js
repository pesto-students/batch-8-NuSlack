import React, { Component } from "react";
import styled from "styled-components";
import ContentHeader from "./ContentHeader";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";

const Container = styled.div`
  padding: 1rem;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

export default class ChatScreen extends Component {
  render() {
    return (
      <Container>
        <ContentHeader />
        <MessageContainer />
        <MessageInput />
      </Container>
    );
  }
}
