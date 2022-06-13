import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/authContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { KeyboardAvoid } from '../../components/KeyboardAvoid';
import { UseNavigationProps } from '../../types/UseNavigationProps';
import { Container, Header, Subtitle, Form, Title, Footer } from './styles';

export function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const navigation = useNavigation<UseNavigationProps>();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });
      await schema.validate({ email, password });
      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message)
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
      }
    };
  };

  return(
    <KeyboardAvoid>
      <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Header>
          <Title>Estamos{'\n'}quase lá.</Title>
          <Subtitle>Faça seu login para começar{'\n'}uma experiência incrível.</Subtitle>
        </Header>
        <Form>
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            iconName='mail'
            keyboardType='email-address'
            onChangeText={setEmail}
            placeholder='E-mail'
            value={email}
          />
          <PasswordInput iconName='lock' onChangeText={setPassword} placeholder='Senha' value={password} />
        </Form>
        <Footer>
          <Button
            title='Login'
            onPress={handleSignIn}
            enabled={true}
            isLoading={false}
          />
          <Button
            color={theme.colors.background_secondary}
            title='Criar conta gratuita'
            onPress={() => navigation.navigate('SignUpFirstStep')}
            enabled={true}
            isLoading={false}
            light
          />
        </Footer>
      </Container>
    </KeyboardAvoid>
  );
};
