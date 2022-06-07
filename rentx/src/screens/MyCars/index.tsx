import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
import {
  Container, Header, Title, Subtitle, Content, Appointment, AppointmentTitle, AppointmentQuantity,
  CarWrapper, CarFooter, CarFooterTitle, CarFooterPeriod, CarFooterDate
} from './styles';
import { LoadAnimated } from '../../components/LoadAnimated';
import { UseNavigationProps } from '../../types/UseNavigationProps';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const navigation = useNavigation<UseNavigationProps>();

  useEffect(() => {
    async function getCars(){
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      };
    };
    getCars();
  }, []);

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
        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>
      {loading ? <LoadAnimated /> : 
        <Content>
          <Appointment>
            <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
            <AppointmentQuantity>{cars.length}</AppointmentQuantity>
          </Appointment>
          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal : 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
};
