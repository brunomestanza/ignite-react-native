import { Meal } from "src/@types/meal";
import { Ball, Container, Division, Hour, InfoContainer, Title } from "./styles";

export function MealCard({ date, name, time, type, description, id }: Meal) {
  return (
    <Container>
      <InfoContainer>
        <Hour>{time}</Hour>
        <Division />
        <Title>{name}</Title>
      </InfoContainer>
      <Ball type={type} />
    </Container>
  )
}