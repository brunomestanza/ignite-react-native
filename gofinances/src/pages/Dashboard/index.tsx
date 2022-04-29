import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardDataProps } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from './styles';

export interface DataListProps extends TransactionCardDataProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "13/04/2020",
    },
    {
      id: "2",
      type: 'negative',
      title: "Compra de lanche",
      amount: "R$ 50,00",
      category: {
        name: "Alimentação",
        icon: "coffee",
      },
      date: "10/04/2020",
    },
  ];

  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/brunomestanza.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Bruno</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserContainer>
      </Header>
      <HighlightCards>
        <HighlightCard
          amount='R$ 17.400,00'
          cardType='up'
          lastTransaction='Última entrada dia 13 de abril'
          title='Entradas'
        />
        <HighlightCard
          amount='R$ 1.259,00'
          cardType='down'
          lastTransaction='Última saída dia 03 de abril'
          title='Saídas'
        />
        <HighlightCard
          amount='R$ 16.141,00'
          cardType='total'
          lastTransaction='01 à 16 de abril'
          title='Total'
        />
      </HighlightCards>
      <Transactions>
        <Title>
          Listagem
        </Title>
        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
