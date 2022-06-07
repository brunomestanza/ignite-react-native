import styled from 'styled-components/native';
import { Dimensions, ViewProps } from 'react-native';

export const Container = styled.View``;

export const ImageIndexes = styled.View`
  align-self: flex-end;
  flex-direction: row;
  padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
  align-items: center;
  height: 132px;
  justify-content: center;
  width: ${Dimensions.get('window').width}px;
`;

export const CarImage = styled.Image`
  height: 132px;
  width: 280px;
`;
