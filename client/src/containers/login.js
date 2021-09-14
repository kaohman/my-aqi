import React from 'react';
import { gql, useMutation } from '@apollo/client';
// import { isLoggedInVar } from '../cache';
import LoginForm from '../components/login-form';

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`;

const Login = () => {
  const [login, { loading, error }] = useMutation(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        if (login) {
          localStorage.setItem('token', login.token);
          localStorage.setItem('userId', login.id);
          // isLoggedInVar(true);
        }
      }
    }
  );

  if (loading) return <p>loading...</p>;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}

export default Login;
