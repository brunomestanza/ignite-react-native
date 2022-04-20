import React from 'react';
import { FlatList } from 'react-native';
import { useTask } from '../contexts/useTask';
import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export function TasksList() {
  const { tasks } = useTask();
  
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem item={item} index={index} />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
};
