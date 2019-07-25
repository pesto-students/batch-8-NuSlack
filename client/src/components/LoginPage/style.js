import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  .signup-logo {
    @media only screen and (max-width: 600px) {
      height: 175px;
    }
  }
`;

const anotherStyle = {};

export { LoginContainer, anotherStyle };
