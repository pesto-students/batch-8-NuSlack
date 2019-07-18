import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Form, Button, Select, notification,
} from 'antd';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const { Option } = Select;

const successFullMessage = 'Users added succesfully';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: successFullMessage,
  });
};
const AddUserToTeamForm = (props) => {
  const { SERVER_BASE_URL } = serverConfig;
  const [allUsers, setAllUsers] = useState([]);
  const { activeTeam, allUserIds: allTeamUsers, fetchUsers } = useHomeContext();
  const fetchAllUsers = () => {
    axios.get(`${SERVER_BASE_URL}/users`).then((resp) => {
      const users = resp.data;
      setAllUsers(users);
    });
  };
  useEffect(() => {
    fetchAllUsers();
    fetchUsers(activeTeam);
  }, [activeTeam, fetchUsers]);
  const handleSubmit = (event) => {
    event.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        axios
          .post(`${SERVER_BASE_URL}/teams/${props.teamId || activeTeam}/add-users`, {
            ...values,
          })
          .then(() => {
            openNotificationWithIcon('success');
            fetchAllUsers();
            fetchUsers(activeTeam);
            props.closeModal();
          });
      }
    });
  };
  const listOfUsers = allUsers.filter(user => allTeamUsers.indexOf(user._id) < 0);
  const { getFieldDecorator } = props.form;
  if (!activeTeam && !props.teamId) {
    return 'Error: no teamId';
  }
  return (
    <Form onSubmit={handleSubmit} className="add-users-form">
      <Form.Item>
        {getFieldDecorator('users', {
          rules: [{ required: true, message: 'Please add users!' }],
        })(
          <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select">
            {listOfUsers.map(userObj => (
              <Option key={userObj._id} value={userObj._id}>
                {userObj.username}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

AddUserToTeamForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
  }).isRequired,
  teamId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
AddUserToTeamForm.defaultProps = {
  teamId: null,
};
const WrappedAddUserToTeamForm = Form.create({ name: 'add_channel' })(AddUserToTeamForm);

export default WrappedAddUserToTeamForm;
