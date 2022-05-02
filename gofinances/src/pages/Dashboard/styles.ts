import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { DataListProps } from '.';

interface ButtonProps extends BorderlessButtonProps {
  children: React.ReactNode;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFPercentage(42)}px;
  justify-content: flex-start;
  width: 100%;
`;

export const UserContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  padding: 0 24px;
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  border-radius: 10px;
  height: ${RFValue(48)}px;
  width: ${RFValue(48)}px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

// @ts-ignore
export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  contentContainerStyle: { paddingLeft: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-top: ${RFPercentage(20)}px;
  position: absolute;
  width: 100%;
`;

export const Transactions = styled.View`
  flex: 1;
  margin-top: ${RFPercentage(12)}px;
  padding: 0 24px;
`;

export const Title = styled.Text`
  margin-bottom: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const TransactionsList = styled(FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: getBottomSpace() },
})``;

export const LogoutButton = styled(BorderlessButton)<ButtonProps>``;

export const LoadingContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
