import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner';
import ErrorModal from './error-modal';

const QueryResult = ({ loading, error, data, children }) => {
  const [errorDismissed, setErrorDismissed] = useState(false);

  useEffect(() => {
    setErrorDismissed(false);
  }, [error]);

  if (error && !errorDismissed) {
    return (
      <ErrorModal error={error} dismissError={() => setErrorDismissed(true)} />
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
  return null;
};

export default QueryResult;

const SpinnerContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '200px',
});
