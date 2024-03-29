/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react';
import { notification, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LoginForm from '../LoginForm';
import { useHomeContext } from '../../context/HomeContext';
import { useApi } from '../../custom-hooks';
import { authenticateUser } from '../../API';
import { LoginContainer } from './style';
import { authClients } from '../../config';

const openErrorAlert = (error) => {
  notification.error({
    message: error.message || 'User not found!',
  });
};

const LoginPage = () => {
  const { user, setUser } = useHomeContext();
  const [data, loadData, loading] = useApi(authenticateUser, null);

  const handleFormSubmit = (formData) => {
    loadData('basic', formData);
  };

  const handleGoogleLogin = (response) => {
    const { tokenId } = response;
    loadData('google', { tokenId });
  };

  useEffect(() => {
    if (data && data.data) {
      if (data.data.user && data.data.user._id) {
        setUser(data.data.user);
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
      <img src="/images/logo.png" alt="logo image" className="signup-logo" />
      <h1>Login to meet your friends!</h1>
      <Spin spinning={loading}>
        <div style={{ display: 'block', textAlign: 'center' }}>
          <GoogleLogin
            clientId={authClients.GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={handleGoogleLogin}
            onFailure={openErrorAlert}
            width={200}
            theme="dark"
          />
        </div>
        <br />
        <h3> Login the old fashioned way :)</h3>
        <LoginForm handleFormSubmit={handleFormSubmit} />
      </Spin>
    </LoginContainer>
  );
};

export default LoginPage;
