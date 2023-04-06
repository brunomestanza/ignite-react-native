import { useCallback, useState } from "react";
import { ArrowIcon, Avatar, Container, Description, HomeHeader, Logo, Percentage, SummaryButton, Title, MealsList, MealListTitle } from "./styles";
import logoImg from '@assets/logo.png'
import { Button } from "@components/Button";
import { Plus } from "phosphor-react-native";
import { useTheme } from "styled-components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllMeals } from "@storage/getAllMeals";
import { MealCard } from "./components/MealCard";
import { StoredMeals } from "src/@types/storedMeals";
import { ActivityIndicator, Alert } from "react-native";

export function Home() {
  const [meals, setMeals] = useState<StoredMeals>([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation();

  const quantityOfPositiveMeals = meals.reduce((accumulator, currentValue) => {
      currentValue.data.map((meal) => {
        if (meal.type === 'YES') {
          return accumulator += 1;
        }
      });

      return accumulator;
    },
    0
  );
  const quantityOfNegativeMeals = meals.reduce((accumulator, currentValue) => {
      currentValue.data.map((meal) => {
        if (meal.type === 'NO') {
          return accumulator += 1;
        }
      });

      return accumulator;
    },
    0
  );
  const percentage = (100 * quantityOfPositiveMeals / meals.length);
  const typeOfPercentage = percentage >= 50 ? 'POSITIVE' : 'NEGATIVE';

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

  function handleGoToStatus() {
    console.log(typeOfPercentage);

    navigation.navigate('status', {
      negativeMeals: quantityOfNegativeMeals,
      positiveMeals: quantityOfPositiveMeals,
      totalOfMeals: meals.length,
      typeOfPercentage,
      percentage
    });
  }

  return (
    <Container>
      <HomeHeader>
        <Logo source={logoImg} />
        <Avatar source={{ uri: 'https://github.com/brunomestanza.png' }} />
      </HomeHeader>

      <SummaryButton onPress={handleGoToStatus} variant={typeOfPercentage}>
        <ArrowIcon variant={typeOfPercentage} />
        <Percentage>{percentage}%</Percentage>
        <Description>das refeições dentro da dieta</Description>
      </SummaryButton>

      <Title>Refeições</Title>
      <Button variant="BLACK" title="Nova refeição" onPress={handleGoToNewMeal}>
        <Plus size={18} color={theme.COLORS.WHITE} />
      </Button>

      {isLoading ? <ActivityIndicator /> : (
        <MealsList
          sections={meals}
          keyExtractor={(item: any, index) => item + index}
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
            <MealListTitle>{title}</MealListTitle>
          )}
        />
      )}
    </Container>
  )
}
