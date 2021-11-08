import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Platform, FlatList} from 'react-native';
import Button from '../components/Button';
import { CardSkills } from '../components/CardSkills';

export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState("");

  interface SkillData {
    id: string;
    name: string;
  }

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills(oldState => [...oldState, data]);

    setNewSkill('');
  }

  function handleRemoveSkill(id:string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGretting("Bom dia");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting("Boa tarde");
    } else {
      setGretting("Boa noite");
    }
  },[])

  
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Olá!!!, Marcelo Greick</Text>
      <Text style={styles.greetings}>
        {gretting}
      </Text>

      <TextInput 
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button title="Adicionar" onPress={handleAddNewSkill}/>

      <Text style={[styles.title, {marginVertical: 50}]}>My Skills </Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardSkills 
            skill={item.name} 
            onPress={()=>handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,

  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 5,
  },
  greetings: {
    color: "#fff",
    marginVertical: 5,
  }
})