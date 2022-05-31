import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_primary};
  justify-content: center;
  height: 92px;
  padding: 16px;
  margin-bottom: 8px;
  width: 112px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(13)}px;
`;

