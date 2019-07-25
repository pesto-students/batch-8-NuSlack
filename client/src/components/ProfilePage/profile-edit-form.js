import {
  Form, Icon, Input, Button, Tooltip,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

const ProfileEditForm = (props) => {
  const [avatar, setAvatar] = useState('');
  const handleSubmit = useRef((e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleFormSubmit(values);
      }
    });
  });

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
        span: 18,
        offset: 6,
      },
    },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit.current}>
      <Form.Item
        className="form-item"
        label={(
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
)}
      >
        {getFieldDecorator('username', {
          rules: [{ message: 'Please input your nickname!', whitespace: true }],
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label={(
          <span>
            TagLine&nbsp;
            <Tooltip title="Say something about you.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
)}
      >
        {getFieldDecorator('tagLine', {
          rules: [{ message: 'Please input your tag line!', whitespace: true }],
        })(<Input />)}
      </Form.Item>

      <Form.Item
        label={(
          <span>
            Avatar&nbsp;
            <Tooltip title="Enter a url of your photo.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
)}
      >
        {getFieldDecorator('avatar', {
          rules: [{ message: 'Please enter a url!', whitespace: true }],
        })(<Input onChange={e => setAvatar(e.target.value)} />)}
      </Form.Item>
      <img
        style={{
          height: '150px',
          width: '150px',
          display: 'block',
          margin: 'auto',
          marginBottom: '20px',
        }}
        src={avatar || props.avatar.value}
        alt="dp"
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type="default" htmlType="button" onClick={props.cancelEdit}>
          Cancel
        </Button>
        &nbsp;
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

ProfileEditForm.propTypes = {
  form: PropTypes.shape().isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  avatar: PropTypes.shape({ value: PropTypes.string }).isRequired,
};

const WrappedProfileEditForm = Form.create({
  name: 'profile_edit_form',
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
      tagLine: Form.createFormField({
        ...props.tagLine,
        value: props.tagLine.value,
      }),
      avatar: Form.createFormField({
        ...props.tagLine,
        value: props.avatar.value,
      }),
    };
  },
})(ProfileEditForm);

export default WrappedProfileEditForm;
