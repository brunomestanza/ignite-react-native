import { Container } from "./styles";

interface LabelProps {
  title: string;
}

export function Label ({ title }: LabelProps) {
  return (
    <Container>
      {title}
    </Container>
  )
}
