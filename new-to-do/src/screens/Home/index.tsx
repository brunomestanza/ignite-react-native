import { Image, Text, TextInput, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import logoImg from '../../../assets/logo.png'
import plusImg from '../../../assets/plus-icon.png'
import { colors } from "../../styles/colors";
import { TaskCounter } from "../../components/TaskCounter";
import { useState } from "react";
import { EmptyTasks } from "../../components/EmptyTasks";
import { TodoItem } from "../../components/TodoItem";

interface Task {
  isDone: boolean
  taskTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskTitle, setTaskTitle] = useState('')

  const doneTasksCounter = tasks.filter((task) => {
    return task.isDone === true
  }).length


  function removeTask(title: string) {
    setTasks((state) => state.filter((task) => task.taskTitle !== title))
  }

  function handleAddTask() {
    const hasTask = tasks.filter((task) => {
      return task.taskTitle === taskTitle
    })

    if (hasTask.length !== 0) {
      return Alert.alert("Tarefa já cadastrada", "Essa tarefa já existe.")
    }

    
    if(taskTitle === '') {
      return Alert.alert("Tarefa inválida", "O título não pode ser vazio.")
    }

    setTasks((state) => [...state, { taskTitle, isDone: false }])
    setTaskTitle('')
  }

  function handleToggleTask(title: string) {
    const oldTasks = tasks.filter((task) => task.taskTitle !== title)
    let newTask = tasks.filter((task) => task.taskTitle === title)
    newTask[0].isDone = !newTask[0].isDone
    
    setTasks([...oldTasks, ...newTask])
  }

  function handleRemoveTask(task: string) {
    Alert.alert(
      "Confirmar remoção?",
      `Deseja realmente remover ${task} da lista?`,
      [
        { text: 'Sim', onPress: () => removeTask(task) },
        { text: 'Não', style: 'cancel' },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
      </View>
      <View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Adicione uma tarefa"
            placeholderTextColor={colors["gray-300"]}
            style={styles.input}
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddTask}>
            <Image source={plusImg} />
          </TouchableOpacity>
        </View>
        <View style={styles.countersContainer}>
          <TaskCounter label="Criadas" quantityOfTasks={tasks.length} />
          <TaskCounter label="Concluídas" quantityOfTasks={doneTasksCounter} />
        </View>
          
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.taskTitle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyTasks />
        )}
        renderItem={({ item }) => (
          <TodoItem
            isDone={item.isDone}
            taskTitle={item.taskTitle}
            removeTask={() => handleRemoveTask(item.taskTitle)}
            toggleTask={() => handleToggleTask(item.taskTitle)}
          />
        )}
      />
    </View>
  )
}