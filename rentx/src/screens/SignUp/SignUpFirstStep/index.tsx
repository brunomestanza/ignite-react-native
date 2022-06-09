import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { KeyboardAvoid } from '../../../components/KeyboardAvoid';
import { UseNavigationProps } from '../../../types/UseNavigationProps';
import { Container, Header, Steps, Title, Subtitle, Form, FormTitle } from './styles';
import { Alert } from 'react-native';

export function SignUpFirstStep() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [driverlicense, setDriverLicense] = useState<string>('');
  const navigation = useNavigation<UseNavigationProps>();
 
  async function handleNavigateToNextStep() {
    try {
      const schema = Yup.object().shape({
        driverlicense: Yup.string().required('CNH é obrigatório'),
        email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      });
      const data = { name, email, driverlicense };
      await schema.validate(data);
      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      };
    };
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
          <FormTitle>1. Dados</FormTitle>
          <Input
            iconName='user'
            onChangeText={setName}
            placeholder='Nome'
            value={name}
          />
          <Input
            iconName='mail'
            keyboardType='email-address'
            onChangeText={setEmail}
            placeholder='E-mail'
            value={email}
          />
          <Input
            iconName='credit-card'
            keyboardType='numeric'
            onChangeText={setDriverLicense}
            placeholder='CNH'
            value={driverlicense}
          />
        </Form>
        <Button title='Próximo' onPress={handleNavigateToNextStep} />
      </Container>
    </KeyboardAvoid>
  );
};
