import React from 'react';
import { Icon, Input } from 'antd';
import styled from 'styled-components';
import CircleButton from '../CircleButton';

const InputContainer = styled.div`
  margin-bottom: 0;
`;
const ChatInputBox = () => (
  <InputContainer>
    <Input
      placeholder="Say it"
      size="large"
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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

export default ChatInputBox;
