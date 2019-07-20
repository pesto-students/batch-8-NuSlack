import axios from 'axios';
import { notification } from 'antd';
import { serverConfig } from '../config';

const openErrorAlert = (message) => {
  notification.error({
    message: message || 'Unknown Error!',
  });
};

const getUser = async username => axios.get(`${serverConfig.SERVER_BASE_URL}/users`, {
  params: {
    username,
  },
});

const authenticateUser = async (type, loginData) => {
  let result;
  try {
    if (type === 'google') {
      const { tokenId } = loginData;
      result = await axios.post(`${serverConfig.SERVER_BASE_URL}/auth/google`, {
        access_token: tokenId,
      });
    }
    if (type === 'basic') {
      result = await axios.post(`${serverConfig.SERVER_BASE_URL}/auth/login`, {
        ...loginData,
      });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      openErrorAlert(error.response.data.message);
    } else {
      openErrorAlert(error.message);
    }
  }

  return result;
};

const signupUser = async (signupData) => {
  let result;
  try {
    result = await axios.post(`${serverConfig.SERVER_BASE_URL}/auth/signup`, {
      ...signupData,
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      openErrorAlert(error.response.data.message);
    } else {
      openErrorAlert(error.message);
    }
  }

  return result;
};

const updateUser = async (userId, userData) => {
  let result;
  try {
    result = await axios.patch(`${serverConfig.SERVER_BASE_URL}/users/${userId}`, {
      ...userData,
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      openErrorAlert(error.response.data.message);
    } else {
      openErrorAlert(error.message);
    }
  }

  return result;
};

export {
  getUser, authenticateUser, signupUser, updateUser,
};
