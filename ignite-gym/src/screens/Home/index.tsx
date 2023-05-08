import { FlatList, HStack, Heading, Text, VStack } from "native-base";
import { Header } from "./components/Header";
import { Group } from "./components/Group";
import { useState } from "react";
import { ExerciseCard } from "./components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const [groups, setGroups] = useState(['costas', 'bíceps', 'tríceps', 'ombro']);
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada lateral', 'Remada unilateral', 'Levantamento terra']);
  const [selectedGroup, setSelectedGroup] = useState('costas');
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoToExercise() {
    navigation.navigate("exercise");
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
            isActive={selectedGroup.toLowerCase() === item.toLowerCase()}
            onPress={() => setSelectedGroup(item)}
          />
        )}
      />

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
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleGoToExercise} />
          )}
        />
      </VStack>
    </VStack>
  )
}
