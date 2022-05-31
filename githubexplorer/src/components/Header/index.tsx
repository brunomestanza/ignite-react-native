import React from 'react';

import logoImg from '../../assets/images/logo/logo.png';

import {
  Container,
  Logo,
  BackButton,
  Icon,
  BlankSpace,
  SafeAreaViewIOS
} from './styles';

interface HeaderProps {
  goBack?: () => void;
}

export function Header({ goBack }: HeaderProps) {
  if (goBack) {
    return (
      <SafeAreaViewIOS>
        <Container>
          <BackButton onPress={goBack}>
            <Icon name="arrow-left" size={20} />
          </BackButton>

          <Logo source={logoImg} />

          <BlankSpace />
        </Container>
      </SafeAreaViewIOS>
    )
  }

  return (
    <SafeAreaViewIOS>
      <Container style={{ justifyContent: 'center' }}>
        <Logo source={logoImg} />
      </Container>
    </SafeAreaViewIOS>
  )
}