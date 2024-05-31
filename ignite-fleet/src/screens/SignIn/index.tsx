import { Container, Title, Slogan } from './styles';
import backgroundImg from '../../assets/background.png';
import { Button } from '../../components/Button';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useApp, Realm } from '@realm/react';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const realmApp = useApp()

  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()
      
      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken)
        await realmApp.logIn(credentials)
      } else {
        Alert.alert('Ocorreu um erro', 'Não foi possível conectar-se na sua conta Google')
        setIsAuthenticating(false)
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Ocorreu um erro', 'Não foi possível conectar-se na sua conta Google')
      setIsAuthenticating(false)
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>
      <Button
        title='Entrar com Google'
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}
