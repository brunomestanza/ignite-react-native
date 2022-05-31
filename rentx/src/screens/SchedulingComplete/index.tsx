import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { Container, Content, Title, Message, Footer } from './styles';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation } from '@react-navigation/native';

interface Navigation {
  navigate: (value: string) => void;
}

export function SchedulingComplete(){
  const { width } = useWindowDimensions();
  const navigation = useNavigation<Navigation>();

  return(
    <Container>
      <StatusBar barStyle='light-content' backgroundColor="transparent" translucent />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg height={80} width={80} />
        <Title>Carro alugado</Title>
        <Message>Agora você só precisa ir{`\n`}até a concessionária da RENTX{`\n`}pegar o seu automóvel.</Message>
      </Content>
      <Footer>
        <ConfirmButton title='OK' onPress={() => navigation.navigate('Home')} />
      </Footer>
    </Container>
  );
};
 