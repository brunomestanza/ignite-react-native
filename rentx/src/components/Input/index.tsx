import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { Container, IconContainer, InputText } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({ iconName, value, ...rest }: Props){
  const [isFocused, setisFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const theme = useTheme();

  function handleInputFocus(){
    setisFocused(true);
  }

  function handleInputBlur(){
    setisFocused(false);
    setIsFilled(!!value);
  }

  return(
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
          name={iconName}
          size={24}
        />
      </IconContainer>
      <InputText isFocused={isFocused} onBlur={handleInputBlur} onFocus={handleInputFocus} {...rest} />
    </Container>
  );
};
