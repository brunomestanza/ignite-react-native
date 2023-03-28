import { Image, Text, View } from "react-native";
import clipboardImg from '../../../assets/clipboard.png'
import { styles } from "./styles";

export function EmptyTasks() {
  return (
    <View style={styles.container}>
      <Image source={clipboardImg} style={styles.clipboard} />
      <Text style={{ ...styles.text, fontWeight: "bold" }}>Você ainda não tem tarefas cadastradas</Text>
      <Text style={styles.text}>Crie tarefas e organize seus itens a fazer</Text>
    </View>
  )
}