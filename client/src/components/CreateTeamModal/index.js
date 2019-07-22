import React, { useState } from 'react';
import {
  Drawer, Form, Button, Input, Icon,
} from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import { useHomeContext } from '../../context/HomeContext';
import { serverConfig } from '../../config';

const DrawerBody = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CreateTeamModal = ({ visible, handleCancel, form }) => {
  const { user, addTeam } = useHomeContext();
  const { SERVER_BASE_URL } = serverConfig;
  const [avatarUrl, setAvatarUrl] = useState('');
  const [teamName, setTeamName] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const team = await axios.post(`${SERVER_BASE_URL}/teams`, {
          ...values,
          admins: [user._id],
        });
        addTeam(team.data);
        handleCancel();
        form.resetFields();
        setAvatarUrl('');
        setTeamName('');
      }
    });
  };
  const { getFieldDecorator } = form;
  return (
    <Drawer
      title="Create Channel"
      placement="right"
      closable
      onClose={handleCancel}
      visible={visible}
      width="100vw"
    >
      <DrawerBody>
        <h2>Create Team</h2>
        <Form
          onSubmit={handleSubmit}
          className="add-channel-form"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your Team Name!' }],
            })(
              <Input
                prefix={<Icon type="plus-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Team Name"
                onChange={e => setTeamName(e.target.value)}
              />,
            )}
          </Form.Item>
          <div>
            <div
              style={{
                backgroundImage: `url(${avatarUrl})`,
                backgroundSize: 'cover',
                height: '150px',
                width: '150px',
                display: 'flex',
                border: '1px solid #cccccc',
              }}
              alt="Team Avatar"
            >
              <span
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {teamName}
              </span>
            </div>
          </div>
          <Form.Item>
            {getFieldDecorator('avatarUrl', {
              rules: [{ required: true, message: 'Please input your Team Name!' }],
            })(
              <Input
                prefix={<Icon type="plus-circle" style={{ color: 'rgba(255,255,255,.5)' }} />}
                placeholder="Avatar Url"
                onChange={e => setAvatarUrl(e.target.value)}
              />,
            )}
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <h2>Primary Color</h2>
            <Form.Item>
              {getFieldDecorator('primaryColor', {
                rules: [{ required: true, message: 'Please enter Primary color!' }],
              })(<input type="color" placeholder="PrimaryColor" />)}
            </Form.Item>
            <h2>Secondary Color</h2>
            <Form.Item>
              {getFieldDecorator('secondaryColor', {
                rules: [{ required: true, message: 'Please enter Secondary color!' }],
              })(<input type="color" placeholder="PrimaryColor" />)}
            </Form.Item>
          </div>
          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </DrawerBody>
    </Drawer>
  );
};

CreateTeamModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
};

const WrappedCreateTeamModal = Form.create({ name: 'create_team' })(CreateTeamModal);

export default WrappedCreateTeamModal;
