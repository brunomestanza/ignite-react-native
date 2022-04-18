import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface SkillCardProps extends TouchableOpacityProps {
  skill: string;
};

export function SkillCard({ skill, ...rest }: SkillCardProps) {
  return (
    <TouchableOpacity style={styles.buttonSkill} {...rest}>
      <Text style={styles.textSkill}>
        {skill}
      </Text>
    </TouchableOpacity> 
  );
};

const styles = StyleSheet.create({
  buttonSkill: {
    alignItems: 'center', 
    backgroundColor: '#1F1E25',
    borderRadius: 50,
    padding: 15,
    marginVertical: 10,
  },
  textSkill: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
