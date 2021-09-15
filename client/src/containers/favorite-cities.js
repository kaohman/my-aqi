import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';
import QueryResult from '../components/query-result';
import FavoriteCityCard from '../components/favorite-city-card';

//GraphQL Queries
export const FAVORITES = gql`
query getFavoriteCities {
  favoriteCities {
    id
    city
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
      <CardContainer>
        <h4>My Saved Locations</h4>
        <Cards>
          {data?.favoriteCities?.map(city => <FavoriteCityCard key={city.id} city={city} />)}
        </Cards>
      </CardContainer>
    </QueryResult>
  );
};

export default FavoriteCities;

const CardContainer = styled.div({
  maxWidth: '700px',
  margin: '10px auto 30px auto',
});

const Cards = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  margin: '10px auto',
});

