import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Icon, Title, Button } from "./styles";

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface TransactionsTypeButtonProps extends RectButtonProps {
  isActive: boolean;
  title: string;
  type: "up" | "down";
}

export function TransactionsTypeButton({ isActive, title, type, ...rest }: TransactionsTypeButtonProps) {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
