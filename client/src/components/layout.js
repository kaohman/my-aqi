import React from 'react';
import styled from '@emotion/styled';
import { widths } from '../styles';

const Layout = ({ fullWidth, children, grid }) => {
  return (
    <PageContainer fullWidth={fullWidth} grid={grid}>
      {children}
    </PageContainer>
  );
};

export default Layout;

const PageContainer = styled.div((props) => ({
  maxWidth: props.fullWidth ? null : `${widths.regularPageWidth}px`,
  width: '100%',
  margin: '0 auto',
}));
