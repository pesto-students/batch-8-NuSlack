import styled from 'styled-components';

const ChatBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0 20px 20px 10px ;
  @media only screen and (max-width: 600px) {
    padding: 0 15px;
  }
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

export { ChatBox, ChatHistory };
