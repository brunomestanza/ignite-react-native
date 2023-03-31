import { ButtonIcon } from "@components/ButtonIcon";
import { Container, PlayerName, Icon } from "./styles";

interface PlayerCardProps {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <PlayerName>{name}</PlayerName>
      <ButtonIcon iconName="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  )
}
