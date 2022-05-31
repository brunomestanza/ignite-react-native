import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import api from '../../services/api';
import { Load } from '../../components/Load';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';
import Logo from '../../assets/logo.svg';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { LoadAnimated } from '../../components/LoadAnimated';

interface Navigation {
  navigate: (value: string, params?: { car: CarDTO }) => void;
}

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<Navigation>();
  const theme = useTheme();
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const ButtonAnimated = Animated.createAnimatedComponent(RectButton);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    }
  });

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
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsButtonStyle, styles.buttonContainer]}>
          <ButtonAnimated style={[styles.button, { backgroundColor: theme.colors.main }]} onPress={() => navigation.navigate('MyCars')}>
            <Ionicons color={theme.colors.shape} name='ios-car-sport' size={32} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    bottom: 13,
    position: 'absolute',
    right: 22,
  },
  button: {
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    height: 60,
    width: 60,
  }
});
