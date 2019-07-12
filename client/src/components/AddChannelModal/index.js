import React from 'react';
import styled from 'styled-components';

import { Modal, Form, Input, Checkbox, Button } from 'antd';

const StyledModal = styled(Modal)`
  .ant-form-item-children {
    display: flex;
    flex-direction: row;
    label {
      width: 40%;
    }
  }
`;
const AddChannelModal = props => {
  const { visible, toggleModal } = props;

  const createChannel = e => {
    e.preventDefault();
  };
  return (
    <StyledModal
      visible={visible}
      title="Create Channel"
      okText="Send Message"
      onCancel={toggleModal}
      onOk={toggleModal}
    >
      <Form onSubmit={createChannel}>
        <Form.Item>
          <label for="channelName">Channel Name</label>
          <Input id="channelName"></Input>
        </Form.Item>

        <Form.Item>
          <label for="channelName">Private</label>
          <Checkbox id="Private"></Checkbox>
        </Form.Item>

        <Form.Item>
          <label for="channelName">Auto Join</label>
          <Checkbox id="autoJoin" checked></Checkbox>
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </StyledModal>
  );
};

export default AddChannelModal;
