import { ThemeProvider } from 'styled-components/native';
import { SignIn } from './src/screens/SignIn';
import theme from './src/theme';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { StatusBar } from 'react-native';
import { AppProvider, UserProvider } from '@realm/react';
import { REALM_APP_ID } from '@env';
import { Routes } from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [isFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  if (!isFontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <SafeAreaProvider>
      <AppProvider id={REALM_APP_ID}>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <UserProvider fallback={SignIn}>
          <Routes />
          </UserProvider>
        </ThemeProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
