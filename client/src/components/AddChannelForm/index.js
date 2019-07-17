import React from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const AddChannelForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        await axios.post('http://localhost:8080/channels', { ...values });
        props.closeModal();
      }
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit} className="add-channel-form">
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [
            { required: true, message: 'Please input your Channel Name!' },
          ],
        })(
          <Input
            prefix={
              <Icon type="plus-circle" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            placeholder="Channel Name"
          />,
        )}
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form.Item>
          {getFieldDecorator('isPrivate', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>Private</Checkbox>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('autoJoin', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Auto Join</Checkbox>)}
        </Form.Item>
      </div>
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedAddChannelForm = Form.create({ name: 'add_channel' })(
  AddChannelForm,
);

export default WrappedAddChannelForm;