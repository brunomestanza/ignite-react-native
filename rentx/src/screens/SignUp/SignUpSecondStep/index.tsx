import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { KeyboardAvoid } from '../../../components/KeyboardAvoid';
import { Container, Header, Steps, Title, Subtitle, Form, FormTitle, PasswordInputsWrapper } from './styles';
import { UseNavigationProps } from '../../../types/UseNavigationProps';
import { PasswordInput } from '../../../components/PasswordInput';
import { useTheme } from 'styled-components';
import { Alert } from 'react-native';
import api from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverlicense: string;
  };
};

export function SignUpSecondStep() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigation = useNavigation<UseNavigationProps>();
  const theme = useTheme();
  const { user } = useRoute().params as Params;
  
  async function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert('Informe a senha e a confirmação');
    };
    if (password != confirmPassword) {
      return Alert.alert('As senhas não são iguais');
    };
    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverlicense,
      password,
    }).then(() => {
      navigation.navigate('Confirmation', {
        message: 'Agora é só fazer login\ne aproveitar',
        title: 'Conta criada!',
        nextScreen: 'SignIn',
      });
    }).catch((error) => {
      console.log(error);
      Alert.alert('Opa', 'Não foi possível cadastrar');
    });
  };

  return(
    <KeyboardAvoid>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
          <Steps>
            <Bullet active />
            <Bullet />
          </Steps>
        </Header>
        <Title>Crie sua{'\n'}conta</Title>
        <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>
        <Form>
          <FormTitle>2. Senha</FormTitle>
          <PasswordInputsWrapper>
            <PasswordInput
              iconName='lock'
              onChangeText={setPassword}
              placeholder='Senha'
              value={password}
            />
            <PasswordInput
              iconName='lock'
              onChangeText={setConfirmPassword}
              placeholder='Repetir senha'
              value={confirmPassword}
            />
          </PasswordInputsWrapper>
        </Form>
        <Button color={theme.colors.success} title='Cadastrar' onPress={handleRegister} />
      </Container>
    </KeyboardAvoid>
  );
};
