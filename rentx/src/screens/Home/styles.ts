import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import React from 'react';

interface MyCarsButtonProps extends RectButtonProps {
  children: React.ReactNode;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  height: 113px;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const CarList = styled(FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;
