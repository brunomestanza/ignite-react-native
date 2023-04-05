import styled from "styled-components/native";

export type ButtonTypeStyleProps = 'BLACK' | 'WHITE';

interface ButtonStyleProps {
  variant: ButtonTypeStyleProps;
}

export const Container = styled.TouchableOpacity<ButtonStyleProps>`
  width: 100%;
  border-radius: 6px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-direction: row;
  background-color: ${({ theme, variant }) => variant === 'WHITE' ? theme.COLORS.WHITE : theme.COLORS["GRAY-200"]};
  border: ${({ theme, variant }) => variant === 'WHITE' && `1px solid ${theme.COLORS["GRAY-100"]}`};
`;

export const Title = styled.Text<ButtonStyleProps>`
  color: ${({ theme, variant }) => variant === 'WHITE' ? theme.COLORS["GRAY-100"] : theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE["SM"]}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
