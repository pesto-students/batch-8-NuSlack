import React, { Component } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import fakeJSON from "../dummy.json";

const Container = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  width: 100vw;
  height: 100vh;
`;

export default class Layout extends Component {
  state = {
    activeUser: "",
    activeChannel: "",
    userChannels: []
  };
  componentDidMount() {
    const { username } = this.props.match.params;
    this.setState({ activeUser: username }, () => {
      this.loadUserChannels();
    });
  }
  loadUserChannels = () => {
    const { activeUser } = this.state;
    const data = JSON.parse(JSON.stringify(fakeJSON));
    const userChannels = [];
    Object.keys(data.users).forEach(userId => {
      if (data.users[userId].userName === activeUser) {
        userChannels.push(...data.users[userId].channels);
      }
    });
    this.setState({
      userChannels: [...this.state.userChannels, ...userChannels]
    });
  };
  loadChannel = channel => {
    console.log("load channel called");
    this.setState({ activeChannel: channel });
  };
  render() {
    const { activeUser, activeChannel, userChannels } = this.state;
    return (
      <Container>
        <Sidebar
          activeUser={activeUser}
          loadChannel={this.loadChannel}
          userChannels={userChannels}
          loadUserChannels={this.loadUserChannels}
        />
        <ChatScreen activeChannel={activeChannel} activeUser={activeUser} />
      </Container>
    );
  }
}
