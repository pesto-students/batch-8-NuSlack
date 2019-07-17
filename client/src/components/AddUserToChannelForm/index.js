import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Select } from 'antd';
import { useHomeContext } from '../../context/HomeContext';

const { Option } = Select;
const AddUserToChannelForm = (props) => {
  const {
    allUsersMap,
    allUserIds,
    activeChannel,
    channelsMap,
    addUserToChannel,
  } = useHomeContext();
  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        addUserToChannel({ channelId: activeChannel, users: values.users });
        props.closeModal();
      }
    });
  };
  const { getFieldDecorator } = props.form;
  if (!channelsMap[activeChannel].users) {
    return 'You are in user Chat';
  }
  return (
    <Form onSubmit={handleSubmit} className="add-users-form">
      <Form.Item>
        {getFieldDecorator('users', {
          rules: [{ required: true, message: 'Please add users!' }],
        })(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
          >
            {allUserIds
              .filter(
                userId => channelsMap[activeChannel].users.indexOf(userId) < 0,
              )
              .map(userId => (
                <Option key={userId} value={userId}>
                  {allUsersMap[userId].username}
                </Option>
              ))
            }
          </Select>,
        )}
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="primary"
          htmlType="submit"
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

AddUserToChannelForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
};
const WrappedAddUserToChannelForm = Form.create({ name: 'add_channel' })(
  AddUserToChannelForm,
);

export default WrappedAddUserToChannelForm;
