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
        <button type="submit">Log in</button>
      </StyledForm>
    </Container>
  );
}

export default LoginForm;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const Heading = styled('h1')({
  margin: '10px',
});


const StyledForm = styled('form')({
  width: '100%',
  maxWidth: 406,
  borderRadius: 3,
  boxShadow: '6px 6px 1px rgba(0, 0, 0, 0.25)',
  backgroundColor: 'white',
});

const StyledInput = styled('input')({
  width: '100%',
  fontSize: 16,
  outline: 'none',
});
