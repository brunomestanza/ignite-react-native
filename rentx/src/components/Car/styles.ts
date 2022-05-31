import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex-direction: row;
  height: 126px;
  justify-content: space-between;
  padding: 24px;
  margin-bottom: 16px;
`;

export const Details = styled.View``;

export const Brand = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
`;

export const About = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 16px;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Period = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.main};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
`;

export const Type = styled.View`
  
`;

export const CarImage = styled.Image`
  height: 85px;
  width: 176px;
`;
