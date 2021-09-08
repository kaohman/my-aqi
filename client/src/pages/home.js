import React, { useState } from 'react';
import { Layout } from '../components';
import { useQuery, gql } from '@apollo/client';
import Dropdown from '../components/dropdown';

export const COUNTRIES = gql`
  query getCountries {
    countries {
      country
    }
  }
`;

export const STATES = gql`
  query getStates($statesCountry: String) {
    states(country: $statesCountry) {
      state
    }
  }
`;

export const CITIES = gql`
  query getCities($citiesCountry: String, $citiesState: String) {
    cities(country: $citiesCountry, state: $citiesState) {
      city
    }
  }
`;


const Home = () => {
  const [country, setCountry] = useState();
  const [state, setGeoState]= useState();
  const [city, setCity]= useState();

  const countriesResult = useQuery(COUNTRIES);
  const statesResult = useQuery(STATES, {
    variables: { statesCountry: country },
  });
  const citiesResult = useQuery(CITIES, {
    variables: { citiesCountry: country, citiesState: state },
  });

  return (
    <Layout grid>
      <Dropdown
        isLoading={countriesResult?.loading}
        type="country"
        value={country}
        changeValue={v => setCountry(v)}
        options={countriesResult?.data?.countries.map(c => c.country)}
      />
      <Dropdown
        isLoading={statesResult.loading}
        isDisabled={!country}
        type="state"
        value={state}
        changeValue={v => setGeoState(v)}
        options={statesResult?.data?.states.map(s => s.state)}
      />
      <Dropdown
        isLoading={citiesResult.loading}
        isDisabled={!state}
        type="city"
        value={city}
        changeValue={v => setCity(v)}
        options={citiesResult?.data?.cities.map(c => c.city)}
      />
    </Layout>
  );
};

export default Home;
