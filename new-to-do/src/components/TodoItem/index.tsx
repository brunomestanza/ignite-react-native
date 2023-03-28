import { View, Text, TouchableOpacity, Image } from "react-native";
import trashImg from '../../../assets/trash.png'
import checkImg from '../../../assets/check.png'
import { styles } from "./styles";

interface TodoItemProps {
  isDone: boolean
  taskTitle: string
  removeTask: () => void
  toggleTask: () => void
}

export function TodoItem({ isDone, taskTitle, removeTask, toggleTask }: TodoItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={isDone ? styles.completeButton : styles.incompleteButton}
        onPress={toggleTask}
        >
        {isDone && (
          <Image source={checkImg} />
        )}
      </TouchableOpacity>
      <Text style={isDone ? styles.doneText : styles.text}>{taskTitle}</Text>
      <TouchableOpacity onPress={removeTask}>
        <Image source={trashImg} />
      </TouchableOpacity>
    </View>
  )
}