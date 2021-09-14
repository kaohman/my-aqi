import React from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import { colors } from '../styles';
import ContentSection from './content-section';
import { setAqiInfo } from '../utils/helpers';

const CityDetail = ({ city, current }) => {
  const {
    weather,
    pollution
  } = current;

  const getDateTimeString = (ts) => {
    return moment(ts).format('LLLL');
  };

  const aqiInfo = setAqiInfo(pollution.aqius);

  return (
    <ContentSection>
      <CityDetails color={aqiInfo.color}>
        <DetailRow>
          <div>
            <h3>The current AQI in {city} is</h3>
            <AqiInfo color={aqiInfo.color}>
              <h1>{pollution.aqius}</h1>
              <h3>{aqiInfo.message}</h3>
            </AqiInfo>
          </div>
        </DetailRow>
        <DetailRow>
          <DetailItem>
            <h4>Last Measured At: {getDateTimeString(pollution.ts)}</h4>
            <h4>Dominant Pollutant: {pollution.mainus}</h4>
          </DetailItem>
        </DetailRow>
        <DetailRow>
          <DetailItem>
            <h4>Current Weather</h4>
            <p>Last Measured At: {getDateTimeString(weather.ts)}</p>
            <p>Temperature: {(weather.tp * (9/5)) + 32}°F</p>
            <p>Atmospheric Pressure: {weather.pr * 0.75} mm Hg</p>
            <p>Humidity: {weather.hu}%</p>
            <p>Wind Speed: {(weather.ws * 2.237).toFixed(2)} mph</p>
            <p>Wind Direction: {weather.wd}° from N</p>
          </DetailItem>
        </DetailRow>
        <DetailItem>
          <p>Weather and pollution data provided by <a href="https://www.iqair.com/" target="_blank" rel="noreferrer">IQAir</a></p>
        </DetailItem>
      </CityDetails>
    </ContentSection>
  );
};

export default CityDetail;

const CityDetails = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  marginBottom: 30,
  border: `solid 2px ${colors[props.color].base}`,
  backgroundColor: colors[props.color].lightest,
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
}));

const DetailRow = styled.div({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
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
  p: {
    margin: '5px 0',
  }
});

const AqiInfo = styled.div((props) => ({
  color: colors[props.color].base,
  marginTop: '10px',
  textAlign: 'center',
}));
