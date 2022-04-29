import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  padding: 18px 16px;
`;

export const Category = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  `;

//@ts-ignore
export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;