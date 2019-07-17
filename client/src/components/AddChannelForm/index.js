import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Form, Icon, Input, Button, Checkbox, Select,
} from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const { Option } = Select;
const AddChannelForm = (props) => {
  const { SERVER_BASE_URL } = serverConfig;
  const [autoJoin, setAutoJoin] = useState(true);
  const {
    allUserIds, allUsersMap, user, addChannel, setActiveChannel,
  } = useHomeContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if (!autoJoin) {
          values.users.push(user._id);
        }
        const channel = await axios.post(`${SERVER_BASE_URL}/channels`, { ...values });
        addChannel(channel.data);
        setActiveChannel(channel.data._id);
        props.closeModal();
      }
    });
  };
  const toggleAutoJoin = (e) => {
    setAutoJoin(e.target.checked);
  };

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit} className="add-channel-form">
      ChannelName
      <Form.Item>
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input your Channel Name!' }],
        })(
          <Input
            prefix={<Icon type="plus-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Channel Name"
          />,
        )}
      </Form.Item>
      {!autoJoin ? (
        <div>
          Users:
          <Form.Item>
            {getFieldDecorator('users', {
              rules: [{ required: true, message: 'Please add users!' }],
            })(
              <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select">
                {allUserIds
                  .filter(id => id !== user._id)
                  .map(userId => (
                    <Option key={userId} value={userId}>
                      {allUsersMap[userId].username}
                    </Option>
                  ))}
              </Select>,
            )}
          </Form.Item>
        </div>
      ) : (
        ''
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!autoJoin ? (
          <Form.Item>
            {getFieldDecorator('isPrivate', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>Private</Checkbox>)}
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item>
          {getFieldDecorator('autoJoin', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox onChange={e => toggleAutoJoin(e)}>Auto Join</Checkbox>)}
        </Form.Item>
      </div>
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

AddChannelForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

const WrappedAddChannelForm = Form.create({ name: 'add_channel' })(AddChannelForm);

export default WrappedAddChannelForm;
