import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTask } from '../contexts/useTask';
import logoImg from '../assets/images/logo/logo.png';

export function Header() {
  const { tasks } = useTask();
  const tasksCounterText = tasks.length === 1 ? "tarefa" : "tarefas";
  
  return (
    <View style={styles.container}>
      <Image source={logoImg} />
      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>Você tem </Text>
        <Text style={styles.tasksCounterBold}>{tasks.length} {tasksCounterText}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#8257E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 60,
    paddingHorizontal: 24,
    paddingTop: getStatusBarHeight(true) + 16,
  },
  tasks: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasksCounter: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  tasksCounterBold: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
  }
});
