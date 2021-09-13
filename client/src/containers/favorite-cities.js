import React from 'react';
import { useQuery, gql } from '@apollo/client';
import QueryResult from '../components/query-result';

//GraphQL Queries
export const FAVORITES = gql`
  query getFavoriteCities($userId) {
  }
`;

// Component
const FavoriteCities = ({ userId }) => {
  const { loading, error, data } = useQuery(FAVORITES, {
    variables: {
      userId,
    },
  });

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <div>{JSON.stringify(data)}</div>
    </QueryResult>
  );
};

export default FavoriteCities;

