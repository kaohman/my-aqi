import React from 'react';
import styled from '@emotion/styled';
import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner';

const Dropdown = ({
  options,
  type,
  value,
  changeValue,
  isLoading,
}) => {
  return (
    <div>
      <Title>
        <h4>{type}</h4>
        {isLoading && <LoadingSpinner size="2xsmall" theme="grayscale" />}
      </Title>
      <Select value={value} disabled={!options} onChange={e => changeValue(e.currentTarget.value)}>
        <option value="">{`Choose a ${type}`}</option>
        {options?.map(value => (
          <option key={value} value={value}>{value}</option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;

const Title = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '5px',
  h4: {
    textTransform: 'capitalize',
  },
});

const Select = styled.select({
  width: '200px',
});