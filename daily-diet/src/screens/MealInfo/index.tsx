import { Header } from "@components/Header";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Content, Background, Title, FormContainer, RowContainer, ErrorMessage } from "./styles";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import { MealTypeButton } from "./components/MealTypeButton";
import { useState } from "react";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Meal } from "src/@types/meal";
import { createAndUpdateMeal } from "@storage/createAndUpdateMeal";

const mealValidationSchema = z.object({
  name: z.string({ required_error: 'O nome da comida é obrigatório.' }),
  description: z.string().optional(),
  date: z.string({ required_error: 'A data é obrigatória.' }),
  time: z.string({ required_error: 'A hora é obrigatória.' }),
});

type MealSchema = z.infer<typeof mealValidationSchema>;

type ActiveButtonType = 'NONE' | 'YES' | 'NO';


export function MealInfo() {
  const [activeButton, setActiveButton] = useState<ActiveButtonType>('NONE');
  const navigation = useNavigation();
  const { control , handleSubmit, formState: { errors } } = useForm<MealSchema>({
    resolver: zodResolver(mealValidationSchema),
  });

  async function handleGoToFeedback(data: MealSchema) {
    if (activeButton === 'NONE') {
      return Alert.alert('Tipo de alimentação', 'Selecione se o alimento estava ou não na dieta.')
    }
    const newMeal: Meal = {...data, type: activeButton, id: String(new Date())};
    
    await createAndUpdateMeal(newMeal);
    navigation.navigate('feedback', { type: activeButton });
  }

  return (
    <Background>
      <Header variant="GRAY">
        <Title>Nova refeição</Title>
      </Header>
      <Container>
        <Content>
          <FormContainer>
            <Label title="Nome" />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                />
              )}
              name="name"
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </FormContainer>

          <FormContainer>
            <Label title="Descrição" />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  multiline={true}
                  numberOfLines={4}
                  isTextArea
                />
              )}
              name="description"
            />
          </FormContainer>

          <RowContainer>
            <FormContainer isRowContainer>
              <Label title="Data" />
              <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                />
              )}
              name="date"
            />
            <ErrorMessage>{errors.date?.message}</ErrorMessage>
            </FormContainer>
            <FormContainer isRowContainer>
              <Label title="Hora" />
              <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                />
              )}
              name="time"
            />
            <ErrorMessage>{errors.time?.message}</ErrorMessage>
            </FormContainer>
          </RowContainer>
          <FormContainer>
            <Label title="Está dentro da dieta?" />
            <RowContainer>
              <MealTypeButton
                isActive={activeButton === 'YES'}
                isInDiet
                title="Sim"
                onPress={() => setActiveButton('YES')}
              />
              <MealTypeButton
                isActive={activeButton === 'NO'}
                isInDiet={false }
                title="Não"
                onPress={() => setActiveButton('NO')}
              />
            </RowContainer>
          </FormContainer>
        </Content>

        <Button
          title="Cadastrar refeição"
          variant="BLACK"
          onPress={handleSubmit(handleGoToFeedback)}
        />
      </Container>
    </Background>
  )
};
