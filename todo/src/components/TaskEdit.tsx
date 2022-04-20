import React from 'react';
import { Image, StyleSheet, TextBase, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import pencilIcon from '../assets/icons/pencil/pencil.png';
import trashIcon from '../assets/icons/trash/trash.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskEditProps {
  isBeingEdited: boolean;
  item: Task;
  index: number;
  handleStartEditing: () => void;
  handleCancelEditing: () => void;
  removeTask: (id: number) => void;
}

export function TaskEdit({ item, index, removeTask, isBeingEdited, handleStartEditing, handleCancelEditing }: TaskEditProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={`trash-${index}`}
        style={{ paddingHorizontal: 24 }}
        onPress={isBeingEdited ? handleCancelEditing : handleStartEditing}
      >
        {
          isBeingEdited
          ? <Icon
              name="x"
              size={22}
              color="#bbb6b6"
            />
          : <Image source={pencilIcon} />
        }
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        testID={`trash-${index}`}
        style={[styles.trashButton, { opacity: isBeingEdited ? 0.2 : 1 }]}
        onPress={() => removeTask(item.id)}
        disabled={isBeingEdited}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    height: 24,
    width: 1,
  },
  trashButton: {
    paddingHorizontal: 24,
  },
});
