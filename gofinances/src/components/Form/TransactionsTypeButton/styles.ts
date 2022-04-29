import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionProps {
  type: 'up' | 'down';
  isActive: boolean;
}

export const Container = styled.View<TransactionProps>`
  border: ${({ isActive }) => isActive ? 0 : 1.5}px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  width: 48%;

  ${({ isActive, type}) => isActive && type === 'up' && css`
    background-color: ${({ theme }) => theme.colors.success_light};
  `}

  ${({ isActive, type}) => isActive && type === 'down' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
  `}
`;

export const Button = styled(RectButton)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
`;

// @ts-ignore
export const Icon = styled(Feather)<TransactionProps>`
  color: ${({ theme, type }) => type === 'up' ? theme.colors.success : theme.colors.attention};
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
