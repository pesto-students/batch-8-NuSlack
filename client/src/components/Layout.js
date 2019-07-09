import React, { Component } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";

const Container = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  width: 100vw;
  height: 100vh;
`;

export default class Layout extends Component {
  render() {
    return (
      <Container>
        <Sidebar />
        <ChatScreen />
      </Container>
    );
  }
}
