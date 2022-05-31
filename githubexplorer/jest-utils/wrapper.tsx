import React from 'react';

import { ThemeProvider } from 'styled-components/native';
import { RepositoriesProvider } from '../src/contexts/RepositoriesProvider';
import theme from '../src/global/styles/theme';

export const ProvidersWrapper = ({ children }: { children: React.ReactChildren }) => (
  <ThemeProvider theme={theme}>
    <RepositoriesProvider>
      {children}
    </RepositoriesProvider>
  </ThemeProvider>
)