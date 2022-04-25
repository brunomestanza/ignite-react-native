import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface TransactionsTypeButtonProps extends TouchableOpacityProps {
  isActive: boolean;
  title: string;
  type: "up" | "down";
}

export function TransactionsTypeButton({ isActive, title, type, ...rest }: TransactionsTypeButtonProps) {
  return (
    // @ts-ignore
    <Container isActive={isActive} type={type} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
};
