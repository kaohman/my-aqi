import React, { useState } from 'react';
import styled from '@emotion/styled';

const LoginForm = ({ login }) => {
  const [email, setEmail] = useState('');

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login({ variables: { email } });
  };

  return (
    <Container>
      <Heading>Login</Heading>
      <StyledForm onSubmit={(e) => onSubmit(e)}>
        <StyledInput
          required
          type="email"
          name="email"
          placeholder="Email"
          data-testid="login-input"
          onChange={(e) => onChange(e)}
        />
        <button type="submit">Log In</button>
      </StyledForm>
    </Container>
  );
}

export default LoginForm;

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '20px',
});

const Heading = styled('h5')({
  margin: '0 10px',
});


const StyledForm = styled('form')({
  display: 'flex',
  gap: '10px',
});

const StyledInput = styled('input')({
  width: '200px',
  fontSize: 16,
  outline: 'none',
});
