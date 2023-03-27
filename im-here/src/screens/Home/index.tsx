import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function removePartipant(name: string) {
    setParticipants((state) => state.filter((participant) => participant !== name))
  }

  function handleAddParticipant() {
    if(participants.includes(participantName)) {
      return Alert.alert("Partipante já cadastrado", "Já existe um participante na lista com esse nome.")
    }
    
    if(participantName === '') {
      return Alert.alert("Nome inválido", "O nome não pode ser vazio.")
    }

    setParticipants((state) => [...state, participantName])
    setParticipantName('')
  }
  
  function handleRemoveParticipant(name: string) {
    Alert.alert(
      "Confirmar remoção?",
      `Deseja realmente remover ${name} da lista?`,
      [
        { text: 'Sim', onPress: () => removePartipant(name) },
        { text: 'Não', style: 'cancel' },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}
      >
        Nome do evento
      </Text>
      <Text style={styles.eventDate}
      >
        Sexta, 24 de Março de 2023.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={(actualText) => setParticipantName(actualText)}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a lista de presença!</Text>
        )}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleRemoveParticipant(item)}
          />
        )}
      />
    </View>
  )
}