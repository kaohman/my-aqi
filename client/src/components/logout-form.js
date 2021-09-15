import React from 'react';
import styled from '@emotion/styled';

const LogoutForm = ({ logout }) => {

  const onSubmit = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <Container>
      <StyledForm onSubmit={(e) => onSubmit(e)}>
        <p>{window.localStorage.getItem('userEmail')}</p>
        <button type="submit">Log Out</button>
      </StyledForm>
    </Container>
  );
}

export default LogoutForm;

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '20px',
});

const StyledForm = styled('form')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  p: {
    margin: 0,
  },
});
