import React from 'react';
import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction
} from './styles';

interface HighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  cardType: 'up' | 'down' | 'total';
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function HighlightCard({ title, amount, lastTransaction, cardType }: HighlightCardProps) {
  return (
    <Container cardType={cardType}>
      <Header>
        <Title cardType={cardType}>{title}</Title>
        <Icon name={icon[cardType]} cardType={cardType} />
      </Header>
      <Content>
        <Amount cardType={cardType}>{amount}</Amount>
        <LastTransaction cardType={cardType}>{lastTransaction}</LastTransaction>
      </Content>
    </Container>
  );
};
