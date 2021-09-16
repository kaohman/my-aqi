import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Layout } from '../components';
import ErrorModal from '../components/error-modal';
import Filters from '../containers/filters';
import City from '../containers/city';
import FavoriteCities from '../containers/favorite-cities';
import Login from '../containers/login';
import { gql, useQuery } from '@apollo/client';

const IS_LOGGED_IN = gql`
  query isUserLoggedIn {
    isLoggedIn @client
  }
`;

const Home = () => {
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const { data } = useQuery(IS_LOGGED_IN);

  useEffect(() => {
    const lastFilters = window.localStorage.getItem('locationFilters');
    if (!!lastFilters) {
      setLocation(JSON.parse(lastFilters));
    }
  }, []);

  return (
    <Layout grid>
      {error && <ErrorModal error={error} dismissError={() => setError(null)} />}
      <Login
        isLoggedIn={data.isLoggedIn}
        handleError={err => setError(err)}
      />
      <Title>
        <h3>Climate change and poor air quality got you down?</h3>
        <h4>Compare air quality at locations around the world. Choose a location to investigate.</h4>
      </Title>
      <Filters
        isLoggedIn={data.isLoggedIn}
        updateLocation={(location) => setLocation(location)}
        handleError={err => setError(err)}
      />
      {data.isLoggedIn && <FavoriteCities handleError={err => setError(err)} />}
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