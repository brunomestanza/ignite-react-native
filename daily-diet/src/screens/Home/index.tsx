import { useCallback, useState } from "react";
import { ArrowIcon, Avatar, Container, Description, HomeHeader, Logo, Percentage, SummaryButton, HomeVariantStyleType, Title, MealsList } from "./styles";
import logoImg from '@assets/logo.png'
import { Button } from "@components/Button";
import { Plus } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllMeals } from "@storage/getAllMeals";
import { MealCard } from "./components/MealCard";
import { StoredMeals } from "src/@types/storedMeals";
import { Meal } from "src/@types/meal";
import { ActivityIndicator, Alert } from "react-native";

interface Section {
  title: string;
  data: Meal[]
}

export function Home() {
  const [typeOfPercentage, settypeOfPercentage] = useState<HomeVariantStyleType>('POSITIVE');
  const [meals, setMeals] = useState<StoredMeals>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation();

  useFocusEffect(useCallback(() => {
    fetchMeals();
  }, []));

  async function fetchMeals() {
    try {
      const storagedMeals = await getAllMeals();

      setMeals(storagedMeals);
    } catch (error) {
      Alert.alert('Erro ao carregar as tarefas.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleGoToNewMeal() {
    navigation.navigate('mealInfo');
  }

  return (
    <Container>
      <HomeHeader>
        <Logo source={logoImg} />
        <Avatar source={{ uri: 'https://github.com/brunomestanza.png' }} />
      </HomeHeader>

      <SummaryButton variant={typeOfPercentage}>
        <ArrowIcon variant={typeOfPercentage} />
        <Percentage>90.86%</Percentage>
        <Description>das refeições dentro da dieta</Description>
      </SummaryButton>

      <Title>Refeições</Title>
      <Button variant="BLACK" title="Nova refeição" onPress={handleGoToNewMeal}>
        <Plus size={18} color={theme.COLORS.WHITE} />
      </Button>

      {/* {isLoading ? <ActivityIndicator /> : mockedMeals.map((meal) => {
        return (
          <MealCard
            key={meal.id}
            id={meal.id}
            name={meal.name.length > 23 ? (meal.name.slice(0, 23) + '...') : meal.name}
            description={meal.description}
            date={meal.date}
            time={meal.time}
            type={meal.type}
          />
        )
      })} */}

      {isLoading ? <ActivityIndicator /> : (
        <MealsList
          sections={meals}
          keyExtractor={(item, index) => {
            console.log(item)

            return String(item)
          }}
          renderItem={({item}: any) => (
            <MealCard
              date={item.date}
              id={item.id}
              name={item.name}
              time={item.time}
              type={item.type}
              description={item.description}
            />
          )}
          renderSectionHeader={({section: { title }}: any) => (
            <Title>{title}</Title>
          )}
        />
      )}
    </Container>
  )
}