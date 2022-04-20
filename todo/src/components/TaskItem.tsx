import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { TaskEdit } from './TaskEdit';
import { TaskProps } from '../types/task';
import { useTask } from '../contexts/useTask';

interface TaskItemProps {
  index: number;
  item: TaskProps;
}

export function TaskItem({ index, item }: TaskItemProps) {
  const { handleEditTask, handleToggleTaskDone, handleRemoveTask } = useTask();

  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdited]);

  function handleStartEditing() {
    setIsBeingEdited(true);
  };

  function handleCancelEditing() {
    setIsBeingEdited(false);
    setEditedTitle(item.title);
  };

  function handleSubmitEditing() {
    handleEditTask(item.id, editedTitle);
    setIsBeingEdited(false);
  };

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => handleToggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            editable={isBeingEdited}
            onChangeText={setEditedTitle}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={editedTitle}
          />
        </TouchableOpacity>
      </View>
      <TaskEdit
        handleCancelEditing={handleCancelEditing}
        handleStartEditing={handleStartEditing}
        index={index}
        isBeingEdited={isBeingEdited}
        item={item}
      />
    </>
  );
};


const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
});
