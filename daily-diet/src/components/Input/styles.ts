import styled from "styled-components/native";

interface InputStyleProps {
  isTextArea?: boolean;
}

export const Container = styled.TextInput<InputStyleProps>`
  height: ${({ isTextArea }) => isTextArea ? '120px' : 'auto'};
  border: ${({ theme }) => `1px solid ${theme.COLORS["GRAY-500"]}`};
  color: ${({ theme }) => theme.COLORS["GRAY-100"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  padding: 14px;
  border-radius: 6px;
`;