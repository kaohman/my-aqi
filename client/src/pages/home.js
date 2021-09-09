import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Layout } from '../components';
import { useQuery, gql } from '@apollo/client';
import Dropdown from '../components/dropdown';
import City from '../containers/city';


// GraphQL Queries
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

// Component
const Home = () => {
  const initialFilters = {
    country: undefined,
    state: undefined,
    city: undefined,
  };
  const [filters, setFilters] = useState(initialFilters);

  const setCurrentLocation = (filters) => {
    window.localStorage.setItem('locationFilters', JSON.stringify(filters));
    setFilters(filters);
  };

  const updateDropdown = (type, value) => {
    if (type === 'country') {
      setCurrentLocation({ country: value, state: undefined, city: undefined });
      return;
    }
    if (type === 'state') {
      setCurrentLocation({ ...filters, state: value, city: undefined });
      return;
    }
    if (type === 'city') {
      setCurrentLocation({ ...filters, city: value });
      return;
    }
  };

  useEffect(() => {
    const lastFilters = window.localStorage.getItem('locationFilters');
    if (!!lastFilters?.country) {
      setCurrentLocation(JSON.parse(lastFilters));
    }
  }, []);

  useQuery(CLOSEST_CITY, {
    // skip: filters.country || filters.state || filters.city,
    onCompleted: ({ closestCity: { country, state, city} }) => {
      setCurrentLocation({
        country,
        state,
        city,
      });
    },
  });

  const countriesResult = useQuery(COUNTRIES, {
    onError: () => setCurrentLocation(initialFilters),
  });
  const statesResult = useQuery(STATES, {
    skip: !filters.country,
    variables: { statesCountry: filters.country },
    onError: () => setCurrentLocation({ ...filters, state: undefined, city: undefined }),
  });
  const citiesResult = useQuery(CITIES, {
    skip: !filters.country || !filters.state,
    variables: { citiesCountry: filters.country, citiesState: filters.state },
    onError: () => setCurrentLocation({ ...filters, city: undefined }),
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
            value={filters.country}
            changeValue={v => updateDropdown('country', v)}
            options={countriesResult?.data?.countries.map(c => c.country)}
          />
          <Dropdown
            isLoading={statesResult.loading}
            type="state"
            value={filters.state}
            changeValue={v => updateDropdown('state', v)}
            options={statesResult?.data?.states.map(s => s.state)}
          />
          <Dropdown
            isLoading={citiesResult.loading}
            type="city"
            value={filters.city}
            changeValue={v => updateDropdown('city', v)}
            options={citiesResult?.data?.cities.map(c => c.city)}
          />
        </DropdownContainer>
      </FiltersContainer>
      {!!filters.city && 
        <City
          country={filters.country}
          state={filters.state}
          city={filters.city}
        />
      }
      {!filters.city && 
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

