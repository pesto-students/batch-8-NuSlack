import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

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

const GreenHeader = styled(Header)`
  background-color: green;
  color: white;
`;

export { ChatBox, ChatHistory, GreenHeader };
