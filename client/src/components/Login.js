import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";
import isEmpty from "../utils/isEmpty";
import { Form } from "../styles/Form.styles";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      error: {
        message: ""
      }
    };
    this.bindEvents();
  }
  bindEvents() {
    this.loginUser = this.loginUser.bind(this);
  }
  loginUser(e) {
    e.preventDefault();
    const { username } = this.state;
    if (isEmpty(username)) {
      this.setState({
        error: {
          message: "Please specify the username"
        }
      });
      return;
    }
    this.props.history.push(`/chat/${username}`);

    this.setState({
      username: ""
    });
  }
  render() {
    const { username, error } = this.state;
    return (
      <Form method="post" onSubmit={this.loginUser}>
        <h2>Login to Slack</h2>
        <ErrorMessage error={error} />
        <label htmlFor="username">
          Username
          <input
            type="username"
            placeholder="username"
            name="username"
            value={username}
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
          />
        </label>
        <button type="submit">Login</button>
      </Form>
    );
  }
}
