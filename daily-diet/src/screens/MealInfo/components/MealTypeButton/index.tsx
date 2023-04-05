import { TouchableOpacityProps } from "react-native";
import { Ball, ButtonTitle, Container, MealTypeButtonStyleProps } from "./styles";

interface MealTypeButtonProps extends MealTypeButtonStyleProps, TouchableOpacityProps {
  title: string;
}

export function MealTypeButton ({ isActive, isInDiet, title, ...rest }: MealTypeButtonProps) {
  return (
    <Container isActive={isActive} isInDiet={isInDiet} {...rest}>
      <Ball isActive={isActive} isInDiet={isInDiet} />
      <ButtonTitle>
        {title}
      </ButtonTitle>
    </Container>
  )
}