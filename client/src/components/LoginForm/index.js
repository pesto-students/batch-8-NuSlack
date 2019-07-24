import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import StyledWrapper from './style';

const LoginForm = (props) => {
  const handleSubmit = useRef((e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleFormSubmit(values);
      }
    });
  });

  const { getFieldDecorator } = props.form;
  return (
    <StyledWrapper>
      <Form onSubmit={handleSubmit.current} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="you@somewhere.com"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="./forgot-password">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </StyledWrapper>
  );
};

LoginForm.propTypes = {
  form: PropTypes.shape().isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

const WrappedLoginForm = Form.create({ name: 'app_login_form' })(LoginForm);

export default WrappedLoginForm;
