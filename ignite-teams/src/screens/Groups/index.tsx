import { useCallback, useState } from 'react';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container } from './styles';
import { Alert, FlatList } from 'react-native';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAllGroups } from '@storage/group/getAllGroups';
import { Loading } from '@components/Loading';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));
  
  async function fetchGroups() {
    try {
      setIsLoading(true);
      const storagedData = await getAllGroups();

      setGroups(storagedData);
    } catch (error) {
      Alert.alert('Erro ao carregar', 'Não foi possível carregar as turmas.');
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  function handleGoToPlayers(group: string) {
    navigation.navigate('players', { group });
  };

  function handleGoToNewGroup() {
    navigation.navigate('newGroup');
  };

  return (
    <Container>
      <Header />
      <Highlight title='Turmas' subtitle='jogue com a sua turma' />

      {isLoading ? <Loading />
        : (
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => <GroupCard title={item} onPress={() => handleGoToPlayers(item)} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => <EmptyList message='Que tal cadastrar a primeira turma?' />}
          />
        )
      }
      
      <Button title='Criar nova turma' onPress={handleGoToNewGroup} />
    </Container>
  );
}
