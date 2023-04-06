import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home';
import { MealInfo } from '@screens/MealInfo';
import { Feedback } from '@screens/Feedback';
import { Status } from '@screens/Status';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName='home'
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name='home'
        component={Home}
      />
      <Screen
        name='mealInfo'
        component={MealInfo}
      />
      <Screen
        name='feedback'
        component={Feedback}
      />
      <Screen
        name='status'
        component={Status}
      />
    </Navigator>
  )
}