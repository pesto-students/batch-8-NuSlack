import {
  Form, Icon, Input, Button, Tooltip,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import StyledWrapper from './style';

const SignupForm = (props) => {
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = useRef((e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleFormSubmit(values);
      }
    });
  });

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 0 },
    },
    wrapperCol: {
      xs: { span: 24 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <StyledWrapper>
      <Form {...formItemLayout} onSubmit={handleSubmit.current}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input placeholder="Email" />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder="Password" />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password placeholder="Password" onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={(
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </StyledWrapper>
  );
};

SignupForm.propTypes = {
  form: PropTypes.shape().isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};

const WrappedSignupForm = Form.create({ name: 'app_signup_form' })(SignupForm);

export default WrappedSignupForm;
