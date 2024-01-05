import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, SectionList, Heading, Text, useToast } from "native-base";
import { HistoryCard } from "./HistoryCard";
import { useCallback, useState } from "react";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryGroupedByDayDto } from "@dtos/historyGroupedByDayDto";
import { Loading } from "@components/Loading";

export function History() {
  const toast = useToast()
  const [exercises, setExercises] = useState<HistoryGroupedByDayDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(useCallback(() => {
    getHistory()
  }, []))

  async function getHistory() {
    try {
      setIsLoading(true)
      const response = await api.get('/history')
      console.log(response.data)
      setExercises(response.data)
      // navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível buscar o registro de exercícios.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      { isLoading ? <Loading /> :
        <SectionList
          px={8}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
          sections={exercises}
          ListEmptyComponent={() => (
            <Text color='gray.100' textAlign='center'>Não há exercícios registrados ainda.</Text>
          )}
          keyExtractor={item => item.id}
          renderSectionHeader={({ section }) => (
            <Heading color='gray.200' fontSize='md' mt={10} mb={3} fontFamily="heading">
              {section.title}
            </Heading>
          )}
          renderItem={({ item }) => (
            <HistoryCard data={item} />
          )}
        />
      }
    </VStack>
  )
};
