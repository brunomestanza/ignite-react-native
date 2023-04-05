import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, FeedbackText, Heading, Image, ImportantFeedback } from "./styles";
import positiveFeedbackImage from '@assets/positive-feedback.png';
import negativeFeedbackImage from '@assets/negative-feedback.png';
import { Button } from "@components/Button";

interface FeedbackScreenRouteParams {
  type:  'YES' | 'NO';
}

export function Feedback() {
  const navigation = useNavigation();
  const route = useRoute();
  const { type } = route.params as FeedbackScreenRouteParams;

  function handleGoToHome() {
    navigation.navigate("home");
  }

  return (
    <Container>
      <Heading type={type}>
        {
          type === 'YES'
          ? 'Continue assim!'
          : 'Que pena!'
        }
      </Heading>

      {
        type === 'YES'
        ? (
          <FeedbackText>
            Você continua <ImportantFeedback>dentro da dieta.</ImportantFeedback> Muito bem!
          </FeedbackText>
        )
        : (
          <FeedbackText>
            Você <ImportantFeedback>saiu da dieta</ImportantFeedback> dessa vez, mas continue se esforçando e não desista.
          </FeedbackText>
        )
      }
      
      <Image source={type === "YES" ? positiveFeedbackImage : negativeFeedbackImage} />

      <Button
        title="Ir para a página principal"
        variant="BLACK"
        onPress={handleGoToHome}
      />
    </Container>
  )
}