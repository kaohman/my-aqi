import React from 'react';
import styled from '@emotion/styled';

const ErrorModal = ({ error, dismissError }) => {
  return (
    <ErrorBackground>
      <ErrorContainer>
        <p>ERROR: {error.message}</p>
        {error.message.includes('403') && <p>I'm cheap and using the free version of the API so your call limit has been reached.</p>}
        <p>Please try refreshing the page.</p>
        <button onClick={dismissError}>Okay</button>
      </ErrorContainer>
    </ErrorBackground>
  );
};

export default ErrorModal;

const ErrorBackground = styled.div({
  backgroundColor: 'rgba(100, 100, 100, 0.4)',
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100vh',
  width: '100%',
});

const ErrorContainer = styled.div({
  backgroundColor: 'white',
  border: '1px solid black',
  position: 'absolute',
  margin: '400px 30%',
  padding: '20px',
  textAlign: 'center',
  width: '400px',
});
