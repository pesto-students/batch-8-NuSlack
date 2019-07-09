import React, { Fragment } from "react";
import styled from "styled-components";
import { Item } from "../styles/SidebarItem.styles";
import { Status } from "./Sidebar";

const MessageTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  h2 {
    font-size: 1rem;
  }
`;

const Messages = () => {
  return (
    <Fragment>
      <MessageTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus" />
      </MessageTitles>
      <ul>
        <Item>
          <li>
            Member 1 <Status />
          </li>
          <li>
            Member 2 <Status />
          </li>
          <li>
            Member 3 <Status />
          </li>

          <li>
            Member 4 <Status />
          </li>
        </Item>
      </ul>
    </Fragment>
  );
};

export default Messages;
