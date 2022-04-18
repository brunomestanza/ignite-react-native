import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TextInput , View } from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };
    setMySkills(oldState => [...oldState, data]);
  };

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id)); 
  };

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good night');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Bruno</Text>
      <Text style={styles.greeting}>{greeting}</Text>
      <TextInput
        placeholder="New skill"
        placeholderTextColor="#555555"
        style={styles.input}
        onChangeText={setNewSkill}
      />
      <Button
        handleAddNewSkill={handleAddNewSkill}
        title="Add"
      />
      <Text style={[styles.title, { marginVertical: 50 }]}>My skills</Text>
      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SkillCard onPress={() => handleRemoveSkill(item.id)} skill={item.name} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121015',
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 70,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    borderRadius: 5,
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 30,
    padding: Platform.OS === 'ios' ? 15 : 10,
  },
  greeting: {
    color: '#FFFFFF',
  },
});
