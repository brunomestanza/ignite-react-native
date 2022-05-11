import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from './styles';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuthContext } from '../../contexts/AuthContext';
import { useTheme } from 'styled-components';

export function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signInWithGoogle, signInWithApple } = useAuthContext();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error){
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    setIsLoading(true);
    try {
      await signInWithApple();
    } catch (error){
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  return(
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            height={RFValue(68)}
            width={RFValue(120)}
          />
          <Title>
            Controle suas{'\n'}finanças de forma{'\n'}muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com{'\n'}uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton onPress={handleSignInWithGoogle} title='Entrar com o Google' svg={GoogleSvg} />
          {Platform.OS === 'ios' && <SignInSocialButton onPress={handleSignInWithApple} title='Entrar com o Apple' svg={AppleSvg}/>}
        </FooterWrapper>
        { isLoading && <ActivityIndicator color={theme.colors.shape} style={{ marginTop: 18 }} />}
      </Footer>
    </Container>
  );
};
