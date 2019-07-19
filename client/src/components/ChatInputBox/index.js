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
    sendMessage, activeChannel, activeUser, allUsersMap, typingEvent, 
  } = useHomeContext();
  const [input, setInput] = useState('');

  // Hook the chat input box to a listener which activates onChange and emits the event to the server via socket
  // Inherit the event from HomeContext
  function fireTypingEvent(event) {
    event.preventDefault();
    console.log('User is typing');
    typingEvent();
/*
    // console.log(event.type);
    // TODO replace with emit socket actions
    // TODO  when user stops typing print "User is NOT typing"
    const doneTypingInterval = 5000;  // time in ms (5 seconds)
    // on keyup, start the countdown
    event.Change('keyup', () => {
      if (event.keyCode === 13) {
        console.log('User is typing');
        setTimeout(doneTyping, doneTypingInterval);
      }
    });
    // user is "finished typing," do something
    function doneTyping() {
    // do something
      console.log('User is NOT typing');
    }

*/
  };


  const onInputChange = (e) => {
    setInput(e.target.value);
    fireTypingEvent(e);
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
