import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import theme from './src/styles/theme';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  // Abaixo recebemos um boolean que diz se as fontes passadas como parâmetro foram carregadas
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });

  // Se as fontes não foram carregadas, retornamos um componente de carregamento
  if(!fontsLoaded) {
    return <AppLoading />
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
