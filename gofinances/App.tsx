import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Dashboard } from './src/pages/Dashboard';
import theme from './src/styles/theme';
import { Register } from './src/pages/Register';

export default function App() {
  // Abaixo recebemos um boolean que diz se as fontes passadas como parâmetro foram carregadas
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });

  // Se as fontes não foram carregadas, retornamos um componente de carregamento
  if(!fontsLoaded) {
    return <AppLoading />
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Dashboard /> */}
      <Register />
    </ThemeProvider>
  );
}
