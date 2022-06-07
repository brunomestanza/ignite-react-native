import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { Container, Content, Title, Message, Footer } from './styles';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UseNavigationProps } from '../../types/UseNavigationProps';

interface Params {
  title: string;
  message: string;
  nextScreen: string;
}

export function Confirmation() {
  const navigation = useNavigation<UseNavigationProps>();
  const { message, nextScreen, title } = useRoute().params as Params;
  const { width } = useWindowDimensions();

  return(
    <Container>
      <StatusBar barStyle='light-content' backgroundColor="transparent" translucent />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg height={80} width={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={() => navigation.navigate(nextScreen)} />
      </Footer>
    </Container>
  );
};
 