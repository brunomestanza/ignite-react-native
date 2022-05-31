import React from 'react';
import LottieView from 'lottie-react-native';
import LoadingCar from '../../assets/load_animated.json';
import { Container } from './styles';

export function LoadAnimated(){
  return(
    <Container>
      <LottieView
        autoPlay
        loop
        resizeMode='contain'
        source={LoadingCar}
        style={{ height: 200}}
      />
    </Container>
  );
};
