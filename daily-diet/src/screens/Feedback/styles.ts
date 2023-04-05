import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

interface FeedbackStyleProps {
  type:  'YES' | 'NO';
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 32px;
  align-items: center;
  justify-content: center;
`;

export const Heading = styled.Text<FeedbackStyleProps>`
  color: ${({ theme, type }) => type === "YES" ? theme.COLORS["GREEN-DARK"] : theme.COLORS["RED-DARK"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
  margin-bottom: 8px;
`;

export const FeedbackText = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR };
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin-bottom: 40px;
  text-align: center;
`;

export const ImportantFeedback =  styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const Image = styled.Image`
  margin-bottom: 48px;
`;
