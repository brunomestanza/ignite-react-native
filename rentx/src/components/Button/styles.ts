import { ReactNode } from 'react';
import styled from 'styled-components/native';
import { TextProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface TitleProps extends TextProps {
  light: boolean;
}

interface ButtonProps {
  color: string;
  children: ReactNode;
}

export const Container = styled(RectButton)<ButtonProps>`
  align-items: center;
  background-color: ${({ color }) => color };
  justify-content: center;
  margin-bottom: 8px;
  padding: 19px;
`;

export const Title = styled.Text<TitleProps>`
  color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

