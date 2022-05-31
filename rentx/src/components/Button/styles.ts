import styled from 'styled-components/native';
import { ReactNode } from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps extends RectButtonProps {
  color: string;
  children: ReactNode;
}

export const Container = styled(RectButton)<ButtonProps>`
  align-items: center;
  background-color: ${({ color }) => color };
  justify-content: center;
  padding: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

