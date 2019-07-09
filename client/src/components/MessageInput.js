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

const SubmitButton = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  border-left: 3px solid darkgrey;
  position: fixed;
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1rem;
  right: 27px;
  bottom: 13px;
  cursor: pointer;
`;

const InputStyle = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 3px solid darkgrey;
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid dimgray;
    & + ${SubmitButton} {
      border-left: 3px solid dimgray;
    }
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 220px);
`;

export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.bindEvents();
  }
  bindEvents() {
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }
  handleMessageSubmit = event => {
    event.preventDefault();
    console.log("Message submit triggered");
  };
  handleMessageChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("Message handle change triggered");
  };

  render() {
    const { message } = this.state;
    return (
      <Container>
        <form onSubmit={this.handleMessageSubmit}>
          <InputStyle
            name="message"
            type="text"
            placeholder="Message #TeamName"
            onChange={this.handleMessageChange}
            value={message}
          />
          <SubmitButton disabled={message === ""} type="submit">
            <i className="fas fa-arrow-alt-circle-right" />
          </SubmitButton>
        </form>
      </Container>
    );
  }
}
