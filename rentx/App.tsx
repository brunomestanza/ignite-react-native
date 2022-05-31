import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useFonts, Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import theme from './src/styles/theme';
import { Routes } from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold, Inter_400Regular, Inter_500Medium
  });
  if (!fontsLoaded) {
    return null;
  };
  SplashScreen.hideAsync();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
