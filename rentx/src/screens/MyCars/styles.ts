import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_primary};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.header};
  height: 325px;
  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  margin-top: 24px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;
  margin-top: 24px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 16px;
  width: 100%;
`;

export const Appointment = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between; 
  padding: 24px 0;
`;

export const AppointmentTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex-direction: row;
  justify-content: space-between;
  margin-top: -10px;
  padding: 12px;
  width: 100%;
`;

export const CarFooterTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;

