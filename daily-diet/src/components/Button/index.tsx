import { ReactNode } from "react";
import { ButtonTypeStyleProps, Container, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children?: ReactNode;
  variant: ButtonTypeStyleProps;
  title: string;
}

export function Button({ children, variant, title, ...rest }: ButtonProps) {
  return (
    <Container variant={variant} {...rest}>
      {children}
      <Title variant={variant}>{title}</Title>
    </Container>
  )
};
