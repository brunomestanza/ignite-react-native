import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export type NewMealStyleType = boolean;

interface BackgroundSStyleProps {
  typeOfPercentage: 'POSITIVE' | 'NEGATIVE';
}

interface BoxColorProps {
  variant: 'GRAY' | 'GREEN' | 'RED';
  size: 'FULL' | 'MID';
}

export const Background = styled.View<BackgroundSStyleProps>`
  background-color: ${({ theme, typeOfPercentage }) => typeOfPercentage === 'POSITIVE' ?  theme.COLORS["GREEN-LIGHT"] : theme.COLORS["RED-LIGHT"]};
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

export const Content = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;

export const SummaryContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
`;

export const Percentage = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["2XL"]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-200"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["SM"]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const QuantityNumber = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-200"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["XL"]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const RowContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const Box = styled.View<BoxColorProps>`
  padding: 16px;
  margin: 12px 0;
  border-radius: 8px;
  width: ${({ theme, size }) => size === 'FULL' ? '100%' : '49%'} ;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, variant }) =>
    variant === 'GRAY' ? theme.COLORS["GRAY-500"] : 
    variant === 'GREEN' ? theme.COLORS["GREEN-LIGHT"] :
    theme.COLORS["RED-LIGHT"]
  };
`;
