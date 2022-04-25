import React from "react";
import { Input } from "../../components/Form/Input";
import {
  Container,
  Header,
  Form,
  Title
} from "./styles";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Input placeholder="Nome"></Input>
        <Input placeholder="Preço"></Input>
      </Form>
    </Container>
  );
};