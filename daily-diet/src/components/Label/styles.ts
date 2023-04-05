import styled from "styled-components/native";

export const Container = styled.Text`
  color: ${({ theme }) => theme.COLORS["GRAY-200"]};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;