import React from 'react';
import { gql, useMutation } from '@apollo/client';
import LoginForm from '../components/login-form';
import LogoutForm from '../components/logout-form';
import { isLoggedInVar } from '../cache';
import { useApolloClient } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email) {
      email
      token
    }
  }
`;

const Login = ({ isLoggedIn, handleError }) => {
  const client = useApolloClient();
  const [login] = useMutation(
    LOGIN_USER,
    {
      onCompleted: ({ login }) => {
        if (login) {
          localStorage.setItem('token', login.token);
          localStorage.setItem('userEmail', login.email);
          isLoggedInVar(true);
        }
      },
      refetchQueries: ['getFavoriteCities'],
      onError: (error) => handleError(error),
    }
  );

  const logout = () => {
    client.cache.evict({ fieldName: 'me' });
    client.cache.gc();
  
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    isLoggedInVar(false);
  };

  if (isLoggedIn) return <LogoutForm logout={logout} />;
  return <LoginForm login={login} />;
}

export default Login;
