import React from 'react';
import { gql, useMutation } from '@apollo/client';
import LoginForm from '../components/login-form';
import LogoutForm from '../components/logout-form';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email) {
      email
      token
    }
  }
`;

const Login = ({ isLoggedIn, updateLoginStatus, handleError }) => {
  const [login] = useMutation(
    LOGIN_USER,
    {
      onCompleted: ({ login }) => {
        if (login) {
          localStorage.setItem('token', login.token);
          localStorage.setItem('userEmail', login.email);
          updateLoginStatus(true);
        }
      },
      onError: (error) => handleError(error),
    }
  );

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    updateLoginStatus(false);
  };

  if (isLoggedIn) return <LogoutForm logout={logout} />;
  return <LoginForm login={login} />;
}

export default Login;
