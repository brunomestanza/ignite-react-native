import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, SectionList, Heading, Text } from "native-base";
import { HistoryCard } from "./HistoryCard";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([{
    title: '09.10.22',
    data: ['Pizza', 'Burger', 'Risotto'],
  }])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        px={8}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
        sections={exercises}
        ListEmptyComponent={() => (
          <Text color='gray.100' textAlign='center'>Não há exercícios registrados ainda.</Text>
        )}
        keyExtractor={item => item}
        renderSectionHeader={({ section }) => (
          <Heading color='gray.200' fontSize='md' mt={10} mb={3} fontFamily="heading">
            {section.title}
          </Heading>
        )}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
      />
    </VStack>
  )
};
