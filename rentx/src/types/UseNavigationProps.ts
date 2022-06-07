import { NavigationAction } from "@react-navigation/native";

export interface UseNavigationProps {
  goBack: () => void;
  navigate: (routeName: string, params?: any) => void;
  dispatch: (action: NavigationAction) => void;
}