import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 24px;
  margin-top: ${getStatusBarHeight() + 18}px;
  position: absolute;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Details = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 38px;
  width: 100%;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(25)}px;
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;
export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.main};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(25)}px;
`;

export const Acessories = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;
`;

export const RentalPeriod = styled.View`
  align-items: center;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
  padding-bottom: 16px;
  width: 100%;
`;

export const CalendarIcon = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.main};
  height: 48px;
  justify-content: center;
  width: 48px;
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const DateValue = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const RentalPrice = styled.View`
  margin-top: 16px;
  width: 100%;
`;

export const RentalPriceLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const RentalPriceDetails = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const RentalPriceQuota = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const RentalPriceTotal = styled.Text`
  color: ${({ theme }) => theme.colors.success};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(24)}px; 
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 24px 24px ${getBottomSpace() + 24}px;
`;
