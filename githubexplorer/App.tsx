import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { StatusBar, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { Routes } from './src/routes';
import { RepositoriesProvider } from './src/contexts/RepositoriesProvider';

import theme from './src/global/styles/theme';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Roboto_400Regular,
    Roboto_700Bold
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{ flex: 1 }}
    >
      <StatusBar backgroundColor={theme.colors.gray_50} barStyle="dark-content" />

      <RepositoriesProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </RepositoriesProvider>
    </View>
  )
}
