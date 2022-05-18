import styled from 'styled-components/native';
import { Dimensions, ViewProps } from 'react-native';

interface ImageIndexProps extends ViewProps{
  active?: boolean;
}

export const Container = styled.View``;

export const ImageIndexes = styled.View`
  align-self: flex-end;
  flex-direction: row;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  background-color: ${({ theme, active }) => active ? theme.colors.title : theme.colors.shape};
  border-radius: 3px;
  margin-left: 8px;
  height: 6px;
  width: 6px;
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
