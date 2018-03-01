// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  margin: 0.5rem;
  text-align: center;
  background-color: #ff0000;
  color: #ffffff;
`;

const ErrorMessage = (): Node => (
  <StyledErrorMessage>Error!</StyledErrorMessage>
);

export default ErrorMessage;
