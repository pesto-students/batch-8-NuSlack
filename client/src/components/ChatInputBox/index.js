import React, { useState } from 'react';
import { Icon, Input } from 'antd';
import styled from 'styled-components';
import { useHomeContext } from '../../context/HomeContext';

const InputContainer = styled.div`
  @media only screen and (max-width: 600px) {
    margin-bottom: 3px;
    margin-left: 30px;
    width: 95%;
  }
`;
const ChatInputBox = () => {
  const {
    sendMessage, activeChannel, activeUser, allUsersMap,
  } = useHomeContext();
  const [input, setInput] = useState('');
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <InputContainer>
      <Input
        placeholder="Say it"
        size="large"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={input}
        onChange={onInputChange}
        onPressEnter={(event) => {
          event.preventDefault();
          setInput('');
          if (activeChannel) {
            return sendMessage(input, activeChannel);
          }
          return sendMessage(input, null, activeUser, allUsersMap[activeUser].socketId);
        }}
      />
    </InputContainer>
  );
};

export default ChatInputBox;
