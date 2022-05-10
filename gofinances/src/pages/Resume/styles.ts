import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton, BorderlessButtonProps as GestureHandlerButtonProps } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';

interface BorderlessButtonProps extends GestureHandlerButtonProps {
  children: any;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  height: ${RFValue(113)}px;
  padding-bottom: 17px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  align-items: center;
`;

export const MonthSelect = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)<BorderlessButtonProps>``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const LoadingContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;
