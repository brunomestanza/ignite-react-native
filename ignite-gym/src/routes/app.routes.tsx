import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Home } from "@screens/Home/index";
import { Profile } from "@screens/Profile";

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';
import { useTheme } from "native-base";

type AppRoutes = {
  home: undefined;
  exercise: undefined;
  profile: undefined;
  history: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        // When using a SVG as an icon, always check in the SVG code if it don't have any colors
        options={{ tabBarIcon: ({ color }) => (
          <HomeSvg fill={color} height={iconSize} width={iconSize} />
        ) }}
      />
      <Screen
        name="history"
        component={History}
        options={{ tabBarIcon: ({ color }) => (
          <HistorySvg fill={color} height={iconSize} width={iconSize} />
        ) }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{ tabBarIcon: ({ color }) => (
          <ProfileSvg fill={color} height={iconSize} width={iconSize} />
        ) }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
