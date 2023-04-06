import { Header } from "@components/Header";
import { Container, Content, Background, Title, Percentage, Description, SummaryContainer, Box, QuantityNumber, RowContainer } from "./styles";
import { useRoute } from "@react-navigation/native";

interface StatusScreenRouteParams {
  positiveMeals: number;
  negativeMeals: number;
  totalOfMeals: number;
  typeOfPercentage: 'POSITIVE' | 'NEGATIVE';
  percentage: number;
}

export function Status() {
  const route = useRoute();
  const { positiveMeals, negativeMeals, totalOfMeals, typeOfPercentage, percentage } = route.params as StatusScreenRouteParams;

  return (
    <Background typeOfPercentage={typeOfPercentage}>
      <Header variant={typeOfPercentage === 'POSITIVE' ? 'GREEN' : 'RED'}>
        <SummaryContainer>
          <Percentage>{percentage}%</Percentage>
          <Description>das refeições dentro da dieta</Description>
        </SummaryContainer>
      </Header>
      <Container>
        <Content>
          <Title>Estatísticas gerais</Title>

          <Box variant="GRAY" size="FULL">
            <QuantityNumber>{totalOfMeals}</QuantityNumber>
            <Description>refeições registradas</Description>
          </Box>

          <RowContainer>
          <Box variant="GREEN" size="MID">
            <QuantityNumber>{positiveMeals}</QuantityNumber>
            <Description>refeições dentro da dieta</Description>
          </Box>
          
          <Box variant="RED" size="MID">
            <QuantityNumber>{negativeMeals}</QuantityNumber>
            <Description>refeições fora da dieta</Description>
          </Box>
          </RowContainer>
        </Content>
      </Container>
    </Background>
  )
};
