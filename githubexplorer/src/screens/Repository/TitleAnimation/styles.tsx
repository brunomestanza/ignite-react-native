import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const TitleContainer = styled.ScrollView``;

export const Title = styled(Animated.Text)`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.gray_800};
`;