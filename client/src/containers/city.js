import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import CityDetail from '../components/city-detail';
import QueryResult from '../components/query-result';

//GraphQL Queries
export const CITY = gql`
  query getCity($cityCountry: String, $cityState: String, $cityCity: String) {
    city(country: $cityCountry, state: $cityState, city: $cityCity) {
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

// Component
const City = ({ location }) => {
  console.log(location)
  const { loading, error, data } = useQuery(CITY, {
    skip: !location,
    variables: {
      cityCountry: location && location.country,
      cityState: location && location.state,
      cityCity: location && location.city,
    },
  });

  if (!location) return <PlaceholderText>Select a location using the filters above.</PlaceholderText>;

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <CityDetail city={location.city} current={data?.city.current} />
    </QueryResult>
  );
};

export default City;

const PlaceholderText = styled.h3({
  marginTop: '200px',
  textAlign: 'center',
});

