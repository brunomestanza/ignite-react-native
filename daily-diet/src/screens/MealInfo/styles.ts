import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export type NewMealStyleType = boolean;

interface NewMealStyleProps {
  isRowContainer?: NewMealStyleType;
}

export const Background = styled.View`
  background-color: ${({ theme }) => theme.COLORS["GRAY-500"]};
  flex: 1;
  `

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS["GRAY-700"]};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 24px;
  justify-content: space-between;
`;

export const Content = styled.View``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`;

export const FormContainer = styled.View<NewMealStyleProps>`
  gap: 6px;
  margin-bottom: 24px;
  width: ${({ isRowContainer }) => isRowContainer ? '49%' : '100%'};
`;

export const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.COLORS["RED-DARK"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  gap: 8px;
`;
