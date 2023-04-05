import styled from "styled-components/native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ArrowLeft } from "phosphor-react-native";

export type HeaderStyleVariant = 'GRAY' | 'GREEN' | 'RED';

interface HeaderStyleProps {
  variant: HeaderStyleVariant;
}

const marginTop = 50 + getStatusBarHeight(true);

export const Container = styled.View<HeaderStyleProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px;
  padding-top: ${marginTop}px;
  background-color: ${({ theme, variant }) =>
    variant === 'GRAY' ? theme.COLORS["GRAY-500"] : 
    variant === 'GREEN' ? theme.COLORS["GREEN-LIGHT"] :
    theme.COLORS["RED-LIGHT"]
  };
`;

export const BackButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
  top: ${marginTop}px;
`;

export const BackIcon = styled(ArrowLeft).attrs<HeaderStyleProps>(({ theme, variant }) => ({
  color: variant === 'GRAY' ? theme.COLORS["GRAY-200"] : 
    variant === 'GREEN' ? theme.COLORS["GREEN-DARK"] :
    theme.COLORS["RED-DARK"],
}))<HeaderStyleProps>``;
