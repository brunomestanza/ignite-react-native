import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { ArrowUpRight } from 'phosphor-react-native';
import { StoredMeals } from "src/@types/storedMeals";
import { Meal } from "src/@types/meal";

interface Section {
  title: string;
  data: Meal[];
}

export type HomeVariantStyleType = 'POSITIVE' | 'NEGATIVE';

interface HomeVariantProps {
  variant: HomeVariantStyleType;
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS["GRAY-700"]};
  padding: 24px;
`;

export const HomeHeader = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 32px;
`;

export const Logo = styled.Image`
  width: 82px;
  height: 36px;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border-width: 2px;
  border-color: #000000;
`;

export const SummaryButton = styled.TouchableOpacity<HomeVariantProps>`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme, variant }) => variant === 'POSITIVE' ? theme.COLORS["GREEN-LIGHT"] : theme.COLORS["RED-LIGHT"]};
  border-radius: 8px;
  margin-bottom: 40px;
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

export const ArrowIcon = styled(ArrowUpRight).attrs<HomeVariantProps>(({ theme, variant }) => ({
  size: 24,
  color: variant === 'POSITIVE' ? theme.COLORS["GREEN-DARK"] : theme.COLORS["RED-DARK"]
}))<HomeVariantProps>`
  position: absolute;
  right: 8px;
  top: 8px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["MD"]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 8px;
`;

export const MealsList = styled.SectionList`
  gap: 8px;
`;

export const MealListTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["LG"]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  margin-top: 32px;
`;