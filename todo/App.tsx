import React from 'react';
import { StatusBar } from 'react-native';
import { Home } from './src/pages/Home';
import { TaskContextProvider } from './src/contexts/useTask';

export default function App() {
  return (
    <>
      <TaskContextProvider>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <Home />
      </TaskContextProvider>
    </>
  );
};
