import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export function KeyboardAvoid({children}: Props) {
  return(
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
