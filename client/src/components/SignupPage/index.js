/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../SignupForm';
import { useApi } from '../../custom-hooks';
import { signupUser } from '../../API';
import { SignupContainer } from './style';

const SignupPage = () => {
  const [data, loadData, loading] = useApi(signupUser, null);

  const handleFormSubmit = (formData) => {
    loadData(formData);
  };

  return (
    <SignupContainer>
      <img src="/images/logo.png" alt="logo image" />
      <h1>Signup</h1>
      {loading ? <div>loading...</div> : null}
      {data && data.data && data.data.user && data.data.user._id ? (
        <>
          <div>Signed up Successfully</div>
          <Link to="/">Go to Login</Link>
        </>
      ) : (
        <SignupForm handleFormSubmit={handleFormSubmit} />
      )}
      OR <Link to="/">Go back to Login</Link>
    </SignupContainer>
  );
};

export default SignupPage;
