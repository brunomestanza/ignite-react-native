import React from "react";
import { categories } from "../../utils/categories";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionCardDataProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface TransactionCardProps {
  data: TransactionCardDataProps;
};

export function TransactionCard({ data }: TransactionCardProps) {
  const [ category ] = categories.filter(
    item => item.key === data.category,
  );

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'positive' ? data.amount : `- ${data.amount}`}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};
