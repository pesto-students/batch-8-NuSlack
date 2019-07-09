import styled from "styled-components";
import React from "react";

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  return (
    <ErrorStyles>
      <p>
        <strong>Validation Error:</strong>
        {error.message}
      </p>
    </ErrorStyles>
  );
};

export default DisplayError;
