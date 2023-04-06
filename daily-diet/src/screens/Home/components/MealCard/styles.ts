import styled from "styled-components/native";

interface MealCardStyleProps {
  type: 'YES' | 'NO';
}

export const Container = styled.TouchableOpacity`
  padding: 16px 12px 16px 12px;
  border-radius: 6px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: ${({ theme }) => `1px solid ${theme.COLORS["GRAY-500"]}`};
  margin-top: 8px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const Hour = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XS}px;
`;

export const Division = styled.View`
  height: 14px;
  width: 1px;
  background-color: ${({ theme }) => theme.COLORS["GRAY-400"]};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-200"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const Ball = styled.View<MealCardStyleProps>`
  height: 14px;
  width: 14px;
  background-color: ${({ theme, type }) => type === 'YES' ? theme.COLORS["GREEN-MID"] : theme.COLORS["RED-MID"]};
  border-radius: 999px;
`;
