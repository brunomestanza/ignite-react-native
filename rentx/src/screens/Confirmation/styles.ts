import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.header};
  flex: 1;
  padding-top: 96px;
`;

export const Content = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  margin-top: 40px;
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  text-align: center;
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Footer = styled.View`
  align-items: center;
  margin: 80px 0;
`;
