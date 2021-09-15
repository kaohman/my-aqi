import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
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

export const REMOVE_FAVORITE = gql`
  mutation removeFavoriteCity($removeFavoriteCityId: ID) {
    removeFavoriteCity(id: $removeFavoriteCityId) {
      success
      message
    }
  }
`;

// Component
const FavoriteCities = ({ handleError }) => {
  const { loading, error, data } = useQuery(FAVORITES);
  const [removeFavorite] = useMutation(
    REMOVE_FAVORITE,
    {
      refetchQueries: ['getFavoriteCities'],
      onError: (error) => handleError(error),
    }
  );

  return (
    <QueryResult loading={loading} error={error} data={data}>
      <CardContainer>
        <h4>My Saved Locations</h4>
        <Cards>
          {data?.favoriteCities?.map(city => (
            <FavoriteCityCard
              key={city.id}
              city={city}
              deleteFavorite={() => removeFavorite({ 
                variables: { removeFavoriteCityId: city.id },
              })}
            />
          ))}
          {!data?.favoriteCities.length && <p>You have no favorites. Add one by clicking above!</p>}
        </Cards>
      </CardContainer>
    </QueryResult>
  );
};

export default FavoriteCities;

const CardContainer = styled.div({
  maxWidth: '700px',
  margin: '10px auto 30px auto',
  p: {
    textAlign: 'center',
    width: '100%',
  }
});

const Cards = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '20px',
  margin: '10px auto',
});

