import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, Category, Icon } from "./styles";

interface CategorySelectProps extends TouchableOpacityProps {
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