import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Title } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  );
};
