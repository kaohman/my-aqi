import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Layout } from '../components';
import { useQuery, gql } from '@apollo/client';
import Dropdown from '../components/dropdown';
import City from '../containers/city';

export const CLOSEST_CITY = gql`
  query getClosestCity {
    closestCity {
      city
      state
      country
      coordinates
      current {
        weather {
          ts
          tp
          tp_min
          pr
          hu
          ws
          wd
          ic
        }
        pollution {
          ts
          aqius
          mainus
        }
      }
    }
  }
`;

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
      state
      country
    }
  }
`;


const Home = () => {
  const [country, setCountry] = useState(undefined);
  const [state, setGeoState]= useState(undefined);
  const [city, setCity]= useState(undefined);

  const setFields = (data) => {
    setCountry(data.country);
    setGeoState(data.state);
    setCity(data.city);
  }

  useQuery(CLOSEST_CITY, {
    onCompleted: ({ closestCity }) => {
      setFields(closestCity);
    },
  });

  const countriesResult = useQuery(COUNTRIES, {
    onError: () => {
      setCity(undefined);
      setGeoState(undefined);
      setCountry(undefined)
    },
  });
  const statesResult = useQuery(STATES, {
    skip: !country,
    variables: { statesCountry: country },
    onError: () => {
      setCity(undefined);
      setGeoState(undefined);
    },
  });
  const citiesResult = useQuery(CITIES, {
    skip: !country || !state,
    variables: { citiesCountry: country, citiesState: state },
    onError: () => setCity(undefined),
  });

  return (
    <Layout grid>
      <FiltersContainer>
        <Title>
          <h3>Climate change and poor air quality got you down?</h3>
          <h4>Compare air quality at locations around the world. Choose a location to investigate.</h4>
        </Title>
        <DropdownContainer>
          <Dropdown
            isLoading={countriesResult?.loading}
            type="country"
            value={country}
            changeValue={v => setCountry(v)}
            options={countriesResult?.data?.countries.map(c => c.country)}
          />
          <Dropdown
            isLoading={statesResult.loading}
            type="state"
            value={state}
            changeValue={v => setGeoState(v)}
            options={statesResult?.data?.states.map(s => s.state)}
          />
          <Dropdown
            isLoading={citiesResult.loading}
            type="city"
            value={city}
            changeValue={v => setCity(v)}
            options={citiesResult?.data?.cities.map(c => c.city)}
          />
        </DropdownContainer>
      </FiltersContainer>
      {!!city && 
        <City
          country={country}
          state={state}
          city={city}
        />
      }
      {!city && 
        <PlaceholderText>Select a location using the filters above.</PlaceholderText>
      }
    </Layout>
  );
};

export default Home;

const FiltersContainer = styled.div({
  width: '100%',
  padding: '20px 20%',
});

const Title = styled.div({
  width: '100%',
  padding: '20px 0',
  h3: {
    marginBottom: '10px',
  }
});

const DropdownContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const PlaceholderText = styled.h3({
  marginTop: '200px',
  textAlign: 'center',
});

