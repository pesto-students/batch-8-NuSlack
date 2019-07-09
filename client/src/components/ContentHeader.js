import React, { Component } from "react";
import styled from "styled-components";
import { Input } from "../styles/Input.styles";

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 5;
  background-color: white;
  width: calc(100vw - 220px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.borderColorLight};
`;

const Title = styled.div`
  h3 {
    font-weight: 900;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
  i {
    margin-right: 0.5rem;
    color: darkgrey;
  }
`;

export default class ContentHeader extends Component {
  render() {
    return (
      <Container>
        <Title>
          <div>
            <h3>Channel Two: Currently Active Channel</h3>
          </div>
        </Title>
        <div>
          <Input type="text" placeholder="Search Channels/ Users" />
        </div>
      </Container>
    );
  }
}
