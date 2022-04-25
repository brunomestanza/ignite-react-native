import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { TransactionsTypeButton } from "../../components/Form/TransactionsTypeButton";
import {
  Container,
  Header,
  Form,
  Fields,
  Title,
  TransactionsContainer,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome"></Input>
          <Input placeholder="Preço"></Input>
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
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
};