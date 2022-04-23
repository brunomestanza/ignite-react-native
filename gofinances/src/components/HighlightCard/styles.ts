import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface TypeProps {
  cardType : 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
  background-color: ${( { theme, cardType }) => cardType === 'total' ? theme.colors.secondary : theme.colors.shape};
  border-radius: 5px;
  margin-right: 16px;
  padding: 19px 23px ${RFValue(42)}px;
  width: ${RFValue(300)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  color: ${( { theme, cardType }) => cardType === 'total' ? theme.colors.shape : theme.colors.text_dark};
  font-family: ${( { theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

// @ts-ignore
export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;
  ${({ cardType }) => cardType === 'up' && css`
    color: ${( { theme }) => theme.colors.success};
  `}
  ${({ cardType }) => cardType === 'down' && css`
    color: ${( { theme }) => theme.colors.attention};
  `}
  ${({ cardType }) => cardType === 'total' && css`
    color: ${( { theme }) => theme.colors.shape };
  `}
`;

export const Content = styled.View`

`;

export const Amount = styled.Text<TypeProps>`
  color: ${( { theme, cardType }) => cardType === 'total' ? theme.colors.shape : theme.colors.text_dark};
  font-family: ${( { theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
color: ${( { theme, cardType }) => cardType === 'total' ? theme.colors.shape : theme.colors.text};
  font-family: ${( { theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;
