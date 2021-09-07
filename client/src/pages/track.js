import React from 'react';
import { Layout } from '../components';
import { useQuery, gql } from '@apollo/client';
import TrackDetail from '../components/track-detail';
import QueryResult from '../components/query-result';

/**
 * Track Page is the Catstronaut track's individual page.
 * We display info about the track and the corresponding modules
 */
export const TRACK = gql`
  query getTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
      numberOfViews
      modules {
        id
        title
        length
      }
      description
    }
  }
`;

const Track = ({ trackId }) => {
  const { loading, error, data } = useQuery(TRACK, {
    variables: { trackId },
  });

  if (loading) return <QueryResult loading={loading} error={error} />;
  return (
    <Layout grid>
      <QueryResult loading={loading} error={error} data={data}>
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Track;
