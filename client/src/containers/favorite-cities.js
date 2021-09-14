import React from 'react';
import { useQuery, gql } from '@apollo/client';
import QueryResult from '../components/query-result';

//GraphQL Queries
export const FAVORITES = gql`
query getFavoriteCities {
  favoriteCities {
    id
    country
    state
    city
    coordinates
    current {
      pollution {
        aqius
      }
    }
  }
}
`;

// Component
const FavoriteCities = () => {
  const { loading, error, data } = useQuery(FAVORITES);

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <div>{JSON.stringify(data)}</div>
    </QueryResult>
  );
};

export default FavoriteCities;

