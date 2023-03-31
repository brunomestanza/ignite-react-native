import { Container, Message } from "./styles";

interface EmptyListProps {
  message: string
}

export function EmptyList({ message }: EmptyListProps) {
  return (
    <Container>
      <Message>
        {message}
      </Message>
    </Container>
  )
}
