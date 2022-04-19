import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
    setTasks(oldTasks => [...oldTasks, newTask]);
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

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
