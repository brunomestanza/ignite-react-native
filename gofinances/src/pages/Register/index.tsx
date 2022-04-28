import React, { useState } from "react";
import { Alert, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionsTypeButton } from "../../components/Form/TransactionsTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Header, Form, Fields, Title, TransactionsContainer } from "./styles";

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
  const [transactionType, setTransactionType] = useState<string>('');
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryState>({
    key: 'category',
    name: 'Categoria',
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  function handleRegister(form: Partial<FormData>){
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    };
    if (category.key === 'category') {
      return Alert.alert('Selecione alguma categoria');
    }
    
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
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
                isActive={transactionType === 'up'}
                onPress={() => setTransactionType("up")}
                title="Income"
                type="up"
              />
              <TransactionsTypeButton
                isActive={transactionType === 'down'}
                onPress={() => setTransactionType("down")}
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