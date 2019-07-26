import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Form, Button, notification, Icon, Input,
} from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const successFullMessage = 'Users added successfully';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: successFullMessage,
  });
};
const AddUserToTeamForm = (props) => {
  const { SERVER_BASE_URL } = serverConfig;
  const [allUsers, setAllUsers] = useState([]);
  const {
    activeTeam, allUserIds: allTeamUsers, fetchUsers, user,
  } = useHomeContext();
  const fetchAllUsers = useRef(() => {
    axios.get(`${SERVER_BASE_URL}/users`).then((resp) => {
      const users = resp.data;
      setAllUsers(users);
    });
  });
  useEffect(() => {
    fetchAllUsers.current();
    fetchUsers(activeTeam);
  }, [activeTeam, fetchUsers]);

  const [userCount, setUserCount] = useState(0);

  const remove = useRef((k) => {
    const { form } = props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 0) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  });

  const add = useRef((count) => {
    const { form } = props;
    const keys = form.getFieldValue('keys');
    setUserCount(count + 1);
    const nextKeys = keys.concat(count + 1);
    form.setFieldsValue({
      keys: nextKeys,
    });
  });

  const listOfUsers = allUsers.filter(userObject => allTeamUsers.indexOf(userObject._id) < 0);

  const availableUsersMap = {};

  listOfUsers.forEach((userDetails) => {
    availableUsersMap[userDetails.email] = userDetails._id;
  });

  const { getFieldDecorator, getFieldValue } = props.form;
  if (!activeTeam && !props.teamId) {
    return 'Error: no teamId';
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const { keys, userEmails } = values;
        const invitedUsers = keys.map(key => availableUsersMap[userEmails[key]]).filter(Boolean);
        axios
          .post(`${SERVER_BASE_URL}/invitations`, {
            invitedBy: user._id,
            invitedUsers,
            team: activeTeam,
          })
          .then(() => {
            openNotificationWithIcon('success');
            props.closeModal();
          });
      }
    });
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
    },
  };
  getFieldDecorator('keys', { initialValue: [] });
  const keys = getFieldValue('keys');
  const formItems = keys.map(k => (
    <Form.Item {...formItemLayoutWithOutLabel} required={false} key={k}>
      {getFieldDecorator(`userEmails[${k}]`, {
        validateTrigger: ['onChange', 'onBlur'],
        rules: [
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: "Please input User's Email Id or delete this field.",
          },
        ],
      })(
        <Input
          placeholder="User Email Id"
          style={{ width: '100%', marginRight: 8 }}
          suffix={(
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => remove.current(k)}
            />
)}
        />,
      )}
    </Form.Item>
  ));

  return (
    <Form onSubmit={handleSubmit} className="add-users-form">
      {formItems}
      <Form.Item {...formItemLayoutWithOutLabel}>
        <Button type="dashed" onClick={() => add.current(userCount)} style={{ width: '100%' }}>
          <Icon type="plus" /> Add User
        </Button>
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" htmlType="submit">
          Invite Users
        </Button>
      </Form.Item>
    </Form>
  );
};

AddUserToTeamForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
    getFieldValue: PropTypes.func,
  }).isRequired,
  teamId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
AddUserToTeamForm.defaultProps = {
  teamId: null,
};
const WrappedAddUserToTeamForm = Form.create({ name: 'add_channel' })(AddUserToTeamForm);

export default WrappedAddUserToTeamForm;
