import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.h2`
  display: flex;
  width: 100%;
  justify-content: center;
  position: sticky;
  top: 0;
`;

export default function Header() {
  return <StyledHeader>Lost Coast Tides</StyledHeader>;
}
