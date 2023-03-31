import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";

interface ButtonIconProps extends TouchableOpacityProps {
  iconName: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({ iconName, type = 'PRIMARY', ...rest }: ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={iconName} type={type} />
    </Container>
  )
}
