import { FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";
import { Header } from "./components/Header";
import { Group } from "./components/Group";
import { useEffect, useState, useCallback } from "react";
import { ExerciseCard } from "./components/ExerciseCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDto } from "@dtos/exerciseDto";
import { Loading } from "@components/Loading";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('antebraço');
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast()

  function handleGoToExercise(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId });
  }

  async function getGroups() {
    try {
      setIsLoading(true)
      const response = await api.get('/groups')
      setGroups(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function getExercisesByGroup() {
    setIsLoading(true)
    try {
      const response = await api.get(`exercises/bygroup/${selectedGroup}`)
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    getExercisesByGroup()
  }, [selectedGroup]))

  useEffect(() => {
    getGroups()
  }, [])

  if (groups.length === 0) {
    return <Loading />
  }

  return (
    <VStack flex={1}>
      <Header />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        my={10}
        maxHeight={10}
        minHeight={10}
        _contentContainerStyle={{ px: 8 }}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setSelectedGroup(item)}
          />
        )}
      />

      {
        isLoading ? <Loading /> : (
          <VStack flex={1} px={8}>
            <HStack justifyContent='space-between' mb={5}>
              <Heading color='gray.200' fontSize='md' fontFamily="heading">
                Exercícios
              </Heading>

              <Text color='gray.200' fontSize='sm'>
                {exercises.length}
              </Text>
            </HStack>

            <FlatList
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{ paddingBottom: 20 }}
              data={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard
                  onPress={() => handleGoToExercise(item.id)}
                  data={item}
                />
              )}
            />
          </VStack>
        )
      }
    </VStack>
  )
}
