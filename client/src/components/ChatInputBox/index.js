import React, { useState } from 'react';
import { Icon, Input } from 'antd';
import styled from 'styled-components';
import CircleButton from '../CircleButton';
import { useHomeContext } from '../../context/HomeContext';

const InputContainer = styled.div`
  margin-bottom: 0;
`;
const ChatInputBox = () => {
  const {
    sendMessage, activeChannel, activeUser, allUsersMap, sendTypingEvent,
  } = useHomeContext();
  const [input, setInput] = useState('');
  const onInputChange = (e) => {
    setInput(e.target.value);
    if (activeChannel) {
      return sendTypingEvent(activeChannel);
    }
    return sendTypingEvent(null, activeUser, allUsersMap[activeUser].socketId);
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
        suffix={(
          <>
            <CircleButton>
              <Icon type="smile" />
            </CircleButton>
            &nbsp;
            <CircleButton>
              <Icon type="paper-clip" />
            </CircleButton>
          </>
)}
      />
    </InputContainer>
  );
};

export default ChatInputBox;
