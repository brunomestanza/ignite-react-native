import styled from "styled-components/native";

export interface MealTypeButtonStyleProps {
  isActive: boolean;
  isInDiet: boolean;
}

export const Container = styled.TouchableOpacity<MealTypeButtonStyleProps>`
  padding: 16px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color:
    ${({ theme, isActive, isInDiet }) =>
    !isActive ? theme.COLORS["GRAY-600"]
    : isInDiet ? theme.COLORS["GREEN-LIGHT"]
    : theme.COLORS["RED-LIGHT"]
  };
  border:
    ${({ theme, isActive, isInDiet }) =>
    !isActive ? `1px solid ${theme.COLORS["GRAY-600"]}`
    : isInDiet ? `1px solid ${theme.COLORS["GREEN-DARK"]}`
    : `1px solid ${theme.COLORS["RED-DARK"]}`
  };
  border-radius: 6px;
  min-width: 49%;
  flex-direction: row;
`;

export const Ball = styled.View<MealTypeButtonStyleProps>`
  height: 8px;
  width: 8px;
  border-radius: 999px;
  background-color: ${({ isInDiet, theme }) => isInDiet ? theme.COLORS["GREEN-DARK"] : theme.COLORS["RED-DARK"]};
`;

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;