import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Category, Icon } from "./styles";

interface CategorySelectProps extends RectButtonProps {
  category: string;
}

export function CategorySelectButton({ activeOpacity, category, ...rest }: CategorySelectProps) {
  return (
    <Container {...rest}>
      <Category>{category}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};