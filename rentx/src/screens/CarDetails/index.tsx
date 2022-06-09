import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Container, Header, CarImages, Details, Description, Brand, Name, Rent, Period, Price, Acessories, About, Footer } from './styles';
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { UseNavigationProps } from '../../types/UseNavigationProps';

interface RouteParams {
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation<UseNavigationProps>();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {scrollY.value = event.contentOffset.y});
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], { extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP}),
    }
  });
  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], { extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP}),
    }
  });
  const route = useRoute();
  const { car } =  route.params as RouteParams;
  const theme = useTheme();

  return(
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View style={[headerStyleAnimation, styles.header, { backgroundColor: theme.colors.background_secondary}]}>
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>
        <Animated.View style={sliderCarStyleAnimation}>
          <CarImages>
            <ImageSlider imageUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // 16ms = 60fps
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price }</Price>
          </Rent>
        </Details>
        <Acessories>
          { car.accessories.map(accessory => (
            <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
          ))}
        </Acessories>
        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button title="Escolher período do aluguel" onPress={() => navigation.navigate('Scheduling', { car })} />
      </Footer>
    </Container>
  );
};

const styles =  StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
});
