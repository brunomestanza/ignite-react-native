import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  justify-content: center;
  height: 56px;
  margin-right: 2px;
  width: 55px;
  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
    border-bottom-width: 2px;
  `}
`;

export const InputText = styled(TextInput)<Props>`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 23px;
  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-color: ${theme.colors.main};
    border-bottom-width: 2px;
  `}
`;
