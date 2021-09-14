import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';
import { setAqiInfo } from '../utils/helpers';

const FavoriteCityCard = ({ city }) => {
  const aqiInfo = setAqiInfo(city.current.pollution.aqius);
  return (
    <Card color={aqiInfo.color}>
      <h4>{city.city}</h4>
      <AqiTitle color={aqiInfo.color}>{city.current.pollution.aqius}</AqiTitle>
    </Card>
  );
};

export default FavoriteCityCard;

const Card = styled.div((props) => ({
  width: '200px',
  backgroundColor: colors[props.color].lightest,
  border: '1px solid black',
  padding: '10px',
  textAlign: 'center',
}));

const AqiTitle = styled.h2((props) => ({
  color: colors[props.color].base,
  marginTop: '10px',
}));