import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useHomeContext } from '../../context/HomeContext';

const LoginContainer = styled.div`

display: flex;
justify-content: center;
align-items: center;
height: 100vh;
flex-direction: column;
input{
    width: 20em;
}
button{
    margin-top: 1em;
}
`;
const LoginPage = () => {
  const [input, setInput] = useState('');
  const { user, setUser } = useHomeContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const updateStateAndRedirect = async () => {
    setUser({ username: input });
    const userDataResponse = await axios.get('http://localhost:8080/users', {
      params: {
        username: input,
      },
    });

    if (userDataResponse.data[0]) {
      setUser({ ...userDataResponse.data[0] });
      setLoggedIn(true);
    }
  };

  if (loggedIn || (user && user._id)) {
    return <Redirect to="/home" />;
  }
  return (
    <LoginContainer>
      <h1>Login</h1>
      <Input value={input} onChange={onInputChange} onPressEnter={updateStateAndRedirect} />
      <Button onClick={updateStateAndRedirect}>Login</Button>
    </LoginContainer>
  );
};

export default LoginPage;
