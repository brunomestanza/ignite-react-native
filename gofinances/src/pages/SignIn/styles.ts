import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  height: 70%;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  margin-top: 45px;
  text-align: center;
`;

export const SignInTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  margin-bottom: 67px;
  margin-top: 80px;
  text-align: center;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 30%;
`;

export const FooterWrapper = styled.View`
  justify-content: space-between;
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
`;
