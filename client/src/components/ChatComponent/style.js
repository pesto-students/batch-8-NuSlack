import styled from 'styled-components';

const ChatBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 10px;
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

export { ChatBox, ChatHistory };
