import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import api from '../../services/api';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';
import Logo from '../../assets/logo.svg';
import { LoadAnimated } from '../../components/LoadAnimated';
import { UseNavigationProps } from '../../types/UseNavigationProps';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<UseNavigationProps>();

  function handleNavigateToCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      };
    };
    fetchCars();
  }, []);

  return(
    <Container>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo height={RFValue(12)} width={RFValue(108)}/>
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      { loading ? <LoadAnimated /> : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleNavigateToCarDetails(item)} />}
        />
      )}
    </Container>
  );
};
