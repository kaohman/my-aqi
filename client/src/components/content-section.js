import React from 'react';
import styled from '@emotion/styled';
import { widths, colors } from '../styles';

const ContentSection = ({ children }) => {
  return <ContentDiv>{children}</ContentDiv>;
};

export default ContentSection;

const ContentDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: widths.textPageWidth,
  margin: '10px auto',
  width: '100%',
  alignSelf: 'center',
  backgroundColor: colors.background,
});
