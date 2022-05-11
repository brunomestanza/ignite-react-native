import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler"
import { RFValue } from "react-native-responsive-fontsize";

export const Button = styled(RectButton)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  flex-direction: row;
  height: ${RFValue(56)}px;
  margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  border-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px ;
  justify-content: center;
  padding: ${RFValue(16)}px;
`;

export const Text = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  text-align: center;
`;
