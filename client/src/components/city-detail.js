import React from 'react';
import styled from '@emotion/styled';
import {
  colors,
} from '../styles';
import ContentSection from './content-section';

const CityDetail = ({ city, current }) => {
  const {
    weather,
    pollution
  } = current;

  return (
    <ContentSection>
      <CityDetails>
        <DetailRow>
          <h1>{city}</h1>
        </DetailRow>
        <DetailRow>
          <DetailItem>
            <h4>Weather</h4>
            {JSON.stringify(weather)}
          </DetailItem>
          <DetailItem>
            <h4>Pollution</h4>
            {JSON.stringify(pollution)}
          </DetailItem>
        </DetailRow>
      </CityDetails>
    </ContentSection>
  );
};

export default CityDetail;

const CityDetails = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  borderRadius: 4,
  marginBottom: 30,
  border: `solid 1px ${colors.silver.dark}`,
  backgroundColor: colors.silver.lighter,
  h1: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 5,
  },
  h4: {
    fontSize: '1.2em',
    marginBottom: 5,
    color: colors.text,
  },
});

const DetailRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingBottom: 20,
  marginBottom: 20,
  borderBottom: `solid 1px ${colors.silver.dark}`,
});

const DetailItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: colors.textSecondary,
  alignSelf: 'center',
});
