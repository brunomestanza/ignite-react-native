import { useState } from "react";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { Container, Content, Icon } from "./styles";
import { createGroup } from "@storage/group/createGroup";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState('');

  async function handleGoToPlayers() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Nova turma', 'Informe o nome da turma.');
      }

      await createGroup(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova turma', error.message);
      } else {
        Alert.alert('Nova turma', 'Não foi possível criar uma nova turma.');
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight title="Nova turma" subtitle="crie a turma para adicionar as pessoas" />
        <Input
          placeholder="Nome da turma"
          onChangeText={(text) => setGroup(text)}
          value={group}
        />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleGoToPlayers} />
      </Content>
    </Container>
  )
}