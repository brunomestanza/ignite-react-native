import React, { useEffect } from 'react';
import { Container } from './styles';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, Extrapolate, runOnJS } from 'react-native-reanimated';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { UseNavigationProps } from '../../types/UseNavigationProps';

export function Splash() {
  const navigation = useNavigation<UseNavigationProps>();
  const splashAnimation = useSharedValue(0);
  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        { 
          translateX: interpolate(splashAnimation.value, [0, 50], [0, -50],
            { extrapolateLeft: Extrapolate.CLAMP }),
        },
      ],
    };
  });
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
      transform: [
        { 
          translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0],
            { extrapolateLeft: Extrapolate.CLAMP }),
        },
      ],
    };
  });

  function startApp() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }],
      })
    )
  };

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => { 'worklet'
    runOnJS(startApp)(); });
  }, []);

  return(
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute'}]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={[logoStyle, { position: 'absolute'}]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
};
