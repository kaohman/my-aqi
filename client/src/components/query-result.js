import React from 'react';
import styled from '@emotion/styled';
import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner';

const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return (
      <ErrorContainer>
        <p>ERROR: {error.message}</p>
        {error.message.includes('403') && <p>I'm cheap and using the free version of the API so your call limit has been reached. Please try again in one minute.</p>}
      </ErrorContainer>
    );
  }
  if (loading) {
    return (
      <SpinnerContainer>
        <LoadingSpinner data-testid="spinner" size="large" theme="grayscale" />
      </SpinnerContainer>
    );
  }
  if (data) {
    return children;
  }
};

export default QueryResult;

const ErrorContainer = styled.div({
  margin: '0 auto',
  textAlign: 'center',
  width: '50%',
});

const SpinnerContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '200px',
});
