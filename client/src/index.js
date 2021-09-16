import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from './cache';

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
  headers: {
    authorization: window.localStorage.getItem('token') || '',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Pages />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
