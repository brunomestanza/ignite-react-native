import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../pages/SignIn";

const { Navigator , Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
    </Navigator>
  );
};
