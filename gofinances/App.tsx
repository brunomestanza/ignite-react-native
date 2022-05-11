import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import theme from './src/styles/theme';
import { Routes } from './src/routes/index';
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider, useAuthContext } from './src/contexts/AuthContext';

export default function App() {
  // Abaixo recebemos um boolean que diz se as fontes passadas como parâmetro foram carregadas
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });
  const { isUserStorageLoading } = useAuthContext();

  // Se as fontes não foram carregadas, retornamos um componente de carregamento
  if(!fontsLoaded || isUserStorageLoading) {
    return <AppLoading />
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle='light-content'/>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
