import { ReactNode } from "react";
import { BackButton, BackIcon, Container, HeaderStyleVariant } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  variant: HeaderStyleVariant;
  children: ReactNode;
}

export function Header({ variant, children }: HeaderProps) {
  const navigation  = useNavigation();
  
  function handleGoToHome() {
    navigation.navigate('home');
  }
  
  return (
    <Container variant={variant}>
      <BackButton onPress={handleGoToHome}>
        <BackIcon variant={variant} />
      </BackButton>
      {children}
    </Container>
  )
}