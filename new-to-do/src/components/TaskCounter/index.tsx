import { View, Text } from "react-native"
import { styles } from "./styles"
import { colors } from "../../styles/colors"

interface TaskCounterProps {
  quantityOfTasks: number
  label: 'Criadas' | 'Concluídas'
}

export function TaskCounter({ label, quantityOfTasks }: TaskCounterProps) {
  const labelColor = label === 'Criadas' ? colors.blue : colors.purple

  return (
    <View style={styles.container}>
      <Text
        style={{ ...styles.label, color: labelColor }}
      >
        {label}
      </Text>
      <Text style={styles.taskCounter}>
        {quantityOfTasks}
      </Text>
    </View>
  )
}