import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Layout } from '../components';
import ErrorModal from '../components/error-modal';
import Filters from '../containers/filters';
import City from '../containers/city';
import FavoriteCities from '../containers/favorite-cities';
import Login from '../containers/login';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const hasToken = !!window.localStorage.getItem('token');
    if (hasToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Layout grid>
      {error && <ErrorModal error={error} dismissError={() => setError(null)} />}
      <Login
        isLoggedIn={isLoggedIn}
        updateLoginStatus={status => setIsLoggedIn(status)}
        handleError={err => setError(err)}
      />
      <Title>
        <h3>Climate change and poor air quality got you down?</h3>
        <h4>Compare air quality at locations around the world. Choose a location to investigate.</h4>
      </Title>
      <Filters updateLocation={(location) => setLocation(location)} handleError={err => setError(err)} />
      {isLoggedIn && <FavoriteCities handleError={err => setError(err)} />}
      <City location={location} />
    </Layout>
  );
};

export default Home;

const Title = styled.div({
  width: '100%',
  padding: '20px 20%',
  h3: {
    marginBottom: '10px',
  }
});