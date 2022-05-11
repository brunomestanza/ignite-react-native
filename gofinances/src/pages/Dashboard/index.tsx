import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  LoadingContainer,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/AuthContext';

interface HighlightCardDataProps {
  entries: HightlightCardData;
  expensives: HightlightCardData;
  total: HightlightCardData;
}

interface HightlightCardData {
  amount: string;
  lastTransaction: string;
};

export interface DataListProps extends TransactionCardDataProps {
  id: string;
};

function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {  
  const transactionFilttered = collection.filter(transaction => transaction.type === type);
  if (transactionFilttered.length === 0) {
    return false;
  };
  const lastTransaction = new Date(Math.max.apply(Math, transactionFilttered
    .map(item => new Date(item.date).getTime())));
    
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-Br', { month: 'long' })}`;
};
  
  export function Dashboard() {
  const { signOut, user } = useAuthContext();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightCardDataProps>({} as HighlightCardDataProps);
  const collectionKey = `@gofinances:transactions_user:${user.id}`;

  async function loadTransactions() {
    let entriesSum = 0;
    let expensivesSum = 0;
    try {
      const transactions = await AsyncStorage.getItem(collectionKey);
      const parsedTransactions = transactions ? JSON.parse(transactions) : [];
      const formattedTransactions: DataListProps[] = parsedTransactions.map(
        (item: DataListProps) => {
          if (item.type === 'positive') {
            entriesSum += Number(item.amount);
          } else {
            expensivesSum += Number(item.amount);
          }

          const amount = Number(item.amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
          const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(new Date(item.date));

          return {
            id: item.id,
            name: item.name,
            amount,
            date,
            type: item.type,
            category: item.category,
          }
        }
      );
      const totalSum = entriesSum - expensivesSum;
      const lastTransactionsEntries = getLastTransactionDate(formattedTransactions, 'positive');
      const lastTransactionsExpensives = getLastTransactionDate(formattedTransactions, 'negative');
      const totalInterval = lastTransactionsExpensives === false ? 'Não há transações' : `01 a ${lastTransactionsExpensives}`;
      setHighlightData({
        entries: {
          amount: entriesSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: lastTransactionsEntries === false ? 'Não há transações' : `Ultima entrada dia ${lastTransactionsEntries}`,
        },
        expensives: {
          amount: expensivesSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: lastTransactionsExpensives  === false ? 'Não há transações' : `Ultima saída dia ${lastTransactionsExpensives}`,
        },
        total: {
          amount: totalSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: totalInterval,
        },
      });
      setTransactions(formattedTransactions);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Erro ao carregar as transações");
    };
  };
  
  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ? 
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer> :
        <>
          <Header>
            <UserContainer>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserContainer>
          </Header>
          <HighlightCards>
            <HighlightCard
              amount={highlightData.entries.amount}
              cardType='up'
              lastTransaction={highlightData.entries.lastTransaction}
              title='Entradas'
            />
            <HighlightCard
              amount={highlightData.expensives.amount}
              cardType='down'
              lastTransaction={highlightData.expensives.lastTransaction}
              title='Saídas'
            />
            <HighlightCard
              amount={highlightData.total.amount}
              cardType='total'
              lastTransaction={highlightData.total.lastTransaction}
              title='Total'
            />
          </HighlightCards>
          <Transactions>
            <Title>
              Listagem
            </Title>
            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      }
    </Container>
  );
};
