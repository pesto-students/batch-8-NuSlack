import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  padding-top: 50px;
  align-items: center;
  height: 100vh;
  flex-direction: column;

  .container-row {
      min-width: 900px;
      @media (max-width: 900px) {
        min-width: 100%;
      }
  }
`;

const anotherStyle = {};

export { ProfileContainer, anotherStyle };
