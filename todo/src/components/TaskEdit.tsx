import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useTask } from '../contexts/useTask';
import { TaskProps } from '../types/task';
import pencilIcon from '../assets/icons/pencil/pencil.png';
import trashIcon from '../assets/icons/trash/trash.png';

interface TaskEditProps {
  isBeingEdited: boolean;
  index: number;
  item: TaskProps;
  handleStartEditing: () => void;
  handleCancelEditing: () => void;
}

export function TaskEdit({ item, index, isBeingEdited, handleStartEditing, handleCancelEditing }: TaskEditProps) {
  const { handleRemoveTask } = useTask();

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
              color="#BBB6D6"
            />
          : <Image source={pencilIcon} />
        }
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        testID={`trash-${index}`}
        style={[styles.trashButton, { opacity: isBeingEdited ? 0.2 : 1 }]}
        onPress={() => handleRemoveTask(item.id)}
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
