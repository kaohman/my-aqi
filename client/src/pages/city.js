import React from 'react';
import { Layout } from '../components';
import { useQuery, gql } from '@apollo/client';
import CityDetail from '../components/track-detail';
import QueryResult from '../components/query-result';

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

const City = ({ country, state, city }) => {
  const { loading, error, data } = useQuery(CITY, {
    variables: { country, state, city },
  });

  if (loading) return <QueryResult loading={loading} error={error} />;
  return (
    <Layout grid>
      <QueryResult loading={loading} error={error} data={data}>
        <CityDetail track={data?.current} />
      </QueryResult>
    </Layout>
  );
};

export default City;
