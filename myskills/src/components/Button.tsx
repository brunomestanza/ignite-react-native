import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  handleAddNewSkill: () => void;
  title: string;
};

export function Button({ handleAddNewSkill, title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={.7}
      onPress={handleAddNewSkill}
      style={styles.button}
      {...rest}
    >
      <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#A370F7',
    marginTop: 20,
    padding: Platform.OS === 'ios' ? 15 : 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
