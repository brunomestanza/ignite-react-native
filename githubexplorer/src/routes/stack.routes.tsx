import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import theme from '../global/styles/theme';

import { Dashboard } from '../screens/Dashboard';
import { Repository } from '../screens/Repository';
import { Header } from '../components/Header';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: theme.colors.gray_50
      },
      header: ({ navigation }) => {
        if (navigation.canGoBack()) {
          return <Header goBack={navigation.goBack} />
        }
        return <Header />
      },
      headerTransparent: true
    }}
  >
   <stackRoutes.Screen
    name="Dashboard"
    component={Dashboard}
   />

  <stackRoutes.Screen
    name="Repository"
    component={Repository}
   /> 

  </stackRoutes.Navigator>
)

export default AppRoutes;
