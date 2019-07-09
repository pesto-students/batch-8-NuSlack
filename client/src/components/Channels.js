import React, { Fragment, Component } from "react";
import styled from "styled-components";

const ChannelTiles = styled.div`
  margin: 2rem 0 1rem;
  width: 100px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
`;

const Button = styled.div`
  background-color: transparent;
  padding: 5px;
  color: #fff;
  border: none;
  font-size: 1rem;
  &.btn {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`;

export default class Channels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [
        "Channel 1",
        "Channel 2",
        "Channel 3",
        "Channel 4",
        "Channel 5"
      ]
    };
  }

  render() {
    const { channels } = this.state;
    return (
      <Fragment>
        <ChannelTiles>
          <h2>Channels</h2>
          <i className="fas fa-plus" />
        </ChannelTiles>
        <ul>
          {channels.map(channel => (
            <li>#{channel}</li>
          ))}
        </ul>
        <Button className="btn">
          <i className="fas fa-plus" /> Add Channel
        </Button>
      </Fragment>
    );
  }
}
