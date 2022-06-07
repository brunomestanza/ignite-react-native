import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
  padding: 0 24px;
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + 115}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(40)}px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Form = styled.View`
  margin: 64px 0;
  width: 100%;
`;

export const Footer = styled.View``;
