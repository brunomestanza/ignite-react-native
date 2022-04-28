import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  height: ${RFValue(113)}px;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  align-items: center;
  background-color: ${({ theme, isActive }) => isActive ? theme.colors.secondary_light : theme.colors.background};
  flex-direction: row;
  padding: ${RFValue(15)}px;
`;

// @ts-ignore
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  background-color: ${({ theme }) => theme.colors.text};
  height: 1px;
`;

export const Footer = styled.View`
  padding: 24px;
`;
