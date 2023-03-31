import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { PlayerCard } from "@components/PlayerCard";
import { EmptyList } from "@components/EmptyList";
import { Button } from "@components/Button";
import { Container, Form, HeaderList, QuantityOfPlayers } from "./styles";
import { AppError } from "@utils/AppError";
import { createPlayerInGroup } from "@storage/player/createPlayerInGroup";
import { getPlayersByGroup } from "@storage/player/getPlayersByGroup";
import { getPlayersByGroupAndTeam } from "@storage/player/getPlayersByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { deletePlayerByGroup } from "@storage/player/deletePlayerByGroup";
import { removeGroupByName } from "@storage/group/removeGroupByName";
import { Loading } from "@components/Loading";

interface RouteParams {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const newPlayerNameInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  useEffect(() => {
    fetchPlayersByTeam();
  }, [selectedTeam]);
  

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const storedPlayersByTeam = await getPlayersByGroupAndTeam(group, selectedTeam);

      setPlayers(storedPlayersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Jogadores', 'Não foi possível carregar os jogadores do time.');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteGroup() {
    try {
      await removeGroupByName(group);
      navigation.navigate('groups');
    } catch (error) {
      Alert.alert('Remover turma', 'Não foi possível remover a turma.');
    }
  }

  async function handleAddPlayers() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo jogador', 'Informe o nome da pessoa para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team: selectedTeam,
    }
    try {
      await createPlayerInGroup(newPlayer, group);
      fetchPlayersByTeam();
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo jogador', error.message);
      } else {
        console.log(error);
        Alert.alert('Novo jogador', 'Não foi possível adicionar.');
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await deletePlayerByGroup(playerName, group, selectedTeam);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover jogador', 'Não foi possível remover esse jogador.')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remover turma',
      'Deseja remover a turma e seus jogadores?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => deleteGroup() }
      ]
    )
    
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={(text) => setNewPlayerName(text)}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayers}
          returnKeyType="done"
        />
        <ButtonIcon iconName="add" onPress={handleAddPlayers} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          horizontal
          renderItem={({ item }) => (
              <Filter
                title={item}
                isActive={item === selectedTeam}
                onPress={() => setSelectedTeam(item)}
              />
            )}
        />
        <QuantityOfPlayers>{players.length}</QuantityOfPlayers>
      </HeaderList>

      {
        isLoading ? <Loading /> 
        : (
          <FlatList
            data={players}
            keyExtractor={item => item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
            ListEmptyComponent={() => (
              <EmptyList message="Não há pessoas nesse time" />
            )}
            renderItem={({ item }) => (
              <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />
            )}
          />
        )
      }

      <Button title="Remover turma" type="SECONDARY" onPress={handleRemoveGroup} />
    </Container>
  )
}