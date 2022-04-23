import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

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
} from './styles';

export function Dashboard() {
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
          <Icon name="power" />
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
        <TransactionCard />
      </Transactions>
    </Container>
  );
};
