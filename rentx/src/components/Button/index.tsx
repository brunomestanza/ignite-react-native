import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  isLoading?: boolean;
  light?: boolean;
}

export function Button({ title, color, onPress, enabled = true, isLoading = false, light = false }: Props){
  const theme = useTheme();

  return(
   <Container
      color={color ? color : theme.colors.main}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity : (enabled === false || isLoading === true) ? .5 : 1 }}
    >
      {isLoading ? <ActivityIndicator /> : <Title light={light}>{title}</Title>}
    </Container>
  );
};
