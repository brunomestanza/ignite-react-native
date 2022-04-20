import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { TaskProps } from "../types/task";

interface TaskContextProps {
  tasks: TaskProps[],
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>,
  handleAddTask: (newTaskTitle: string) => void,
  handleRemoveTask: (id: number) => void,
  handleEditTask: (id: number, newTaskTitle: string) => void,
  handleToggleTaskDone: (id: number) => void,
}

interface TaskProviderProps {
  children: React.ReactNode;
}

const TaskContext = createContext({} as TaskContextProps);

export function TaskContextProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  
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
    <TaskContext.Provider value={{ tasks, setTasks, handleAddTask, handleRemoveTask, handleEditTask, handleToggleTaskDone }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext<TaskContextProps>(TaskContext);