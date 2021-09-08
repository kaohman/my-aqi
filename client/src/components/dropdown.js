import React from 'react';
import styled from '@emotion/styled';
import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner';

const Dropdown = ({
  options,
  type,
  value,
  changeValue,
  isDisabled,
  isLoading,
}) => {
  return (
    <DropdownContainer>
      {isLoading && <LoadingSpinner size="xsmall" theme="grayscale" />}
      <select value={value} disabled={isDisabled} onChange={e => changeValue(e.currentTarget.value)}>
        <option value="">{`Choose a ${type}`}</option>
        {options?.map(value => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});