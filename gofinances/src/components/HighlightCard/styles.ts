import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  background-color: ${( { theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-right: 16px;
  padding: 19px 23px ${RFValue(42)}px;
  width: ${RFValue(300)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${( { theme }) => theme.colors.text_dark};
  font-family: ${( { theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(40)}px;
`;

export const Content = styled.View`

`;

export const Amount = styled.Text`
  color: ${( { theme }) => theme.colors.text_dark};
  font-family: ${( { theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  margin-top: 38px;
`;

export const LastTransaction = styled.Text`
  color: ${( { theme }) => theme.colors.text};
  font-family: ${( { theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;
