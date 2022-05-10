import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface HistoryCardStyleProps {
  color: string;
}

export const Container = styled.View<HistoryCardStyleProps>`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  border-left-color: ${({ color }) => color};
  border-left-width: 5px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 13px 24px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;
