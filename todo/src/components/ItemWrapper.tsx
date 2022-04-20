import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ItemWrapperProps {
  index: number;
  children: React.ReactNode;
}

export function ItemWrapper({ index, children }: ItemWrapperProps) {
  if (index % 2 === 0){
    return (
      <LinearGradient
      start={{x: 0, y: 0}} 
      end={{x: 1, y: 0}}
      colors={['rgba(196, 196, 196, 0.24)', 'rgba(196, 196, 196, 0)']}
      style={styles.container}
      >
        {children}
      </LinearGradient>
    );
  };

  return (
    <View
      style={styles.container}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
