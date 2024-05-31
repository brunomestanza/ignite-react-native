import type { TouchableOpacityProps } from "react-native";
import { Container, Loading, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <Container
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  )
}