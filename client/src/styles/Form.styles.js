import styled from "styled-components";

export const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 600;
  h2 {
    color: rebeccapurple;
  }
  label {
    display: block;
    margin-bottom: 1rem;
    color: rebeccapurple;
  }
  input {
    width: 300px;
    padding: 0.5rem;
    font-size: 2rem;
    border: 1px solid black;
    border-radius: 4px;
    &:focus {
      outline: 0;
      border-color: #000;
    }
  }
  button,
  input[type="submit"] {
    width: auto;
    background: #000;
    color: white;
    border: 0;
    box-shadow: 2px 2px 2px rgba(#eee);
    font-size: 2rem;
    font-weight: 600;
    border-radius: 10px;
    padding: 0.5rem 1.2rem;
    background: rebeccapurple;
  }
`;
