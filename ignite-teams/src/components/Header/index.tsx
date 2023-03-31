import { Container, Logo, BackButton, BackIcon } from "./styles";
import logoImg from '@assets/logo.png'
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();
  
  function handleGoBack() {
    navigation.navigate('groups');
  }

  return (
    <Container showBackButton={showBackButton}>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
