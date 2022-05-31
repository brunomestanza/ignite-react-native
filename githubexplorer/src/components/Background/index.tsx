import React, { ReactNode } from 'react';

import githubBg from '../../assets/images/github_bg/github_bg.png';

import { Container, SafeAreaViewIOS } from './styles';

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <Container source={githubBg}>
      <SafeAreaViewIOS>
        {children}
      </SafeAreaViewIOS>
    </Container>
  )
}