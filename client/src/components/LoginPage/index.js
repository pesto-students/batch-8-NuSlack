import React, { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd';
import { Redirect } from 'react-router-dom';
import { useHomeContext } from '../../context/HomeContext';
import { useApi } from '../../custom-hooks';
import { getUser } from '../../API';
import { LoginContainer } from './style';

const openErrorAlert = () => {
  notification.error({
    message: 'User not found!',
  });
};

const LoginPage = () => {
  const [input, setInput] = useState('');
  const { user, setUser } = useHomeContext();
  const [data, loadData, loading] = useApi(getUser, null);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const getUserDetails = () => {
    loadData(input);
  };

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      if (data.data.length) {
        setUser({ ...data.data[0] });
      } else {
        openErrorAlert();
      }
    }
  }, [data, setUser]);

  if (user && user._id) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginContainer>
      <h1>Login</h1>
      <Input
        value={input}
        onChange={onInputChange}
        disabled={loading}
        onPressEnter={getUserDetails}
      />
      <Button onClick={getUserDetails} disabled={loading}>
        Login
      </Button>
    </LoginContainer>
  );
};

export default LoginPage;
