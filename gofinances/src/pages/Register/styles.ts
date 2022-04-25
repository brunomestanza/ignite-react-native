import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  height: ${RFValue(113)}px;
  padding-bottom: 17px;
`;

export const Form = styled.View`
  padding: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;
