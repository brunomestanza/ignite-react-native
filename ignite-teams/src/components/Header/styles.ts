import styled from "styled-components/native";
import { CaretLeft } from "phosphor-react-native";

interface ContainerProps {
  showBackButton: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ showBackButton }) => showBackButton ? "space-between" : "center"};
`;

export const Logo = styled.Image`
  width: 46px;
  height: 55px;
`

export const BackButton = styled.TouchableOpacity``;

export const BackIcon = styled(CaretLeft)
  .attrs(({ theme }) => ({ size: 32, color: theme.COLORS.WHITE }))``;
