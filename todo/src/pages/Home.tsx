import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <TodoInput />
      <TasksList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBEBEB',
    flex: 1,
  },
});
