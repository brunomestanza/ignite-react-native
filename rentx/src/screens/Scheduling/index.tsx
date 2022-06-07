import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import ArrowSvg from '../../assets/arrow.svg';
import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';
import { UseNavigationProps } from '../../types/UseNavigationProps';

interface RouteParams {
  car: CarDTO;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function Scheduling(){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const theme = useTheme();
  const navigation = useNavigation<UseNavigationProps>();
  const route = useRoute();
  const { car } =  route.params as RouteParams;

  function handleNavigationToSchedulingDetails() {
    navigation.navigate('SchedulingDetails', { car, dates: Object.keys(markedDates) } ); 
  };

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    if (start.timestamp > end.timestamp) {
      let newStart = end;
      let newEnd = start;
      start = newStart;
      end = newEnd;
    };
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    setRentalPeriod({
      startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlataformDate(new Date(endDate )), 'dd/MM/yyyy'),
    }); 
  };

  return(
    <Container>
      <StatusBar
        backgroundColor="transparent"
        barStyle='light-content'
        translucent
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={() => navigation.goBack()} />
        <Title>Escolha uma{'\n'}data de início e{'\n'}fim do aluguel</Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button title='Confirmar' onPress={handleNavigationToSchedulingDetails} enabled={!!rentalPeriod.startFormatted} />
      </Footer>
    </Container>
  );
};
