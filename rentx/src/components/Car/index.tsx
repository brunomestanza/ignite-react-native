import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage } from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: Props) { 
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return(
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{`R$ ${data.name}`}</Name>
        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>
      <CarImage resizeMode='contain' source={{ uri: data.thumbnail }} />
    </Container>
  );
};
