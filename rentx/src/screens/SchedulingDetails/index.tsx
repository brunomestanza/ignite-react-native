import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';
import { Container, Header, CarImages, Content, Details, Description, Brand, Name, Rent, Period, Price,
  Acessories, RentalPeriod, CalendarIcon, DateInfo, DateTitle, DateValue, Footer, RentalPrice, RentalPriceLabel,
  RentalPriceDetails, RentalPriceQuota, RentalPriceTotal
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import api from '../../services/api';
import { Alert } from 'react-native';

interface RouteParams {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

interface Navigation {
  navigate: (value: string, params?: { car: CarDTO }) => void;
  goBack: () => void;
}

export function SchedulingDetails(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation<Navigation>();
  const route = useRoute();
  const { car, dates } =  route.params as RouteParams;
  const rentTotal = Number(dates.length * car.rent.price);

  async function handleNavigationToSchedulingComplete() {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];
    await api.post('/schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates, 
    }).then(() => navigation.navigate('SchedulingComplete'))
    .catch(() => {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento');
    });
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, []);
 
  return(
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>
      <CarImages>
        <ImageSlider imageUrl={car.photos} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Acessories>
          {
            car.accessories.map(accessory => (
              <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
            ))
          }
        </Acessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather color={theme.colors.shape} name='calendar' size={24} />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather color={theme.colors.text} name='chevron-right' size={10} />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleNavigationToSchedulingComplete}
          isLoading={loading}
          enabled={!loading}
         />
      </Footer>
    </Container>
  );
};
