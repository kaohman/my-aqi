import React from 'react';
import { useQuery, gql } from '@apollo/client';
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
const City = ({ country, state, city }) => {
  const { loading, error, data } = useQuery(CITY, {
    skip: !country || !state || !city,
    variables: {
      cityCountry: country,
      cityState: state,
      cityCity: city,
    },
  });

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <CityDetail city={city} current={data?.city.current} />
    </QueryResult>
  );
};

export default City;
