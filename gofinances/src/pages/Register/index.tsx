import React, { useState } from "react";
import { Alert, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import uuid from 'react-native-uuid';
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionsTypeButton } from "../../components/Form/TransactionsTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Header, Form, Fields, Title, TransactionsContainer } from "./styles";
import { useAuthContext } from "../../contexts/AuthContext";

interface NavigationProps {
  navigate: (screen: string) => void;
}

interface FormData {
  name: string;
  amount: string;
}

interface CategoryState {
  key: string;
  name: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor númerico').positive('O valor não pode ser negativo').required('O valor é obrigatório'),
});

export function Register() {
  const navigation = useNavigation<NavigationProps>();
  const { user } = useAuthContext();
  const [transactionType, setTransactionType] = useState<string>('');
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryState>({
    key: 'category',
    name: 'Categoria',
  });
  const collectionKey = `@gofinances:transactions_user:${user.id}`;

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleRegister(form: Partial<FormData>){
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    };
    if (category.key === 'category') {
      return Alert.alert('Selecione alguma categoria');
    }
    
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date().toISOString(),
    };

    try {
      const data = await AsyncStorage.getItem(collectionKey);
      const currentData = data ? JSON.parse(data) : [];
      const formattedData = [...currentData, newTransaction];
      await AsyncStorage.setItem(collectionKey, JSON.stringify(formattedData));
      setTransactionType('');
      setCategory({ key: 'category', name: 'Categoria', });
      reset();
      navigation.navigate('Listagem');
    } catch (error) {
      Alert.alert('Não foi possível salvar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              autoCapitalize="sentences"
              autoCorrect={false}
              control={control}
              error={errors.name && errors.name.message}
              name="name"
              placeholder="Nome"
            />
            <InputForm
              error={errors.amount && errors.amount.message}
              control={control}
              keyboardType="numeric"
              name="amount"
              placeholder="Valor"
            />
            <TransactionsContainer>
              <TransactionsTypeButton
                isActive={transactionType === 'positive'}
                onPress={() => setTransactionType("positive")}
                title="Income"
                type="up"
              />
              <TransactionsTypeButton
                isActive={transactionType === 'negative'}
                onPress={() => setTransactionType("negative")}
                title="Outcome"
                type="down"
              />
            </TransactionsContainer>
            <CategorySelectButton category={category.name} onPress={() => setCategoryModalOpen(true)} />
          </Fields>
          <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
        </Form>
        <Modal animationType="slide" visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setCategoryModalOpen(false)}
            />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};