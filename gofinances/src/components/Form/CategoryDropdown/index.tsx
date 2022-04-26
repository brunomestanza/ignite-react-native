import React from "react";
import { Container, Category, Icon } from "./styles";

interface CategorySelectProps {
  category: string;
}

export function CategoryDropdown({ category }: CategorySelectProps) {
  return (
    <Container>
      <Category>{category}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};