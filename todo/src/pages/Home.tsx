import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface TaskProps {
  id: number;
  title: string;
  done: boolean;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: TaskProps = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    const haveATaskWithSameTitle = tasks.find(task => task.title === newTaskTitle);
    if (haveATaskWithSameTitle !== undefined) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
      );
    } else {
      setTasks(oldTasks => [...oldTasks, newTask]);
    };
  };

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => setTasks(oldTasks => oldTasks.filter(task => task.id !== id)),
          style: "default",
        },
      ],
      {cancelable: true},
    );
  };

  function handleEditTask(id: number, newTaskTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToUpdate = updatedTasks.find(task => task.id === id);
    if (!taskToUpdate) {
      return;
    };
    taskToUpdate.title = newTaskTitle;
    setTasks(updatedTasks);
  };

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToUpdate = updatedTasks.find(task => task.id === id);
    if (!taskToUpdate) {
      return;
    };
    taskToUpdate.done = !taskToUpdate.done;
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  },
});
