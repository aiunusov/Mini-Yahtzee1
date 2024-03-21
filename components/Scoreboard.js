import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard, FlatList } from 'react-native'; // Update imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/Style';
import Header from './Header';
import Footer from './Footer';

export default function Scoreboard({ navigation }) {
  const [scoreboardData, setScoreboardData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const saveScore = async (score) => {
    try {
      const newScoreboardData = [...scoreboardData, score];
      await AsyncStorage.setItem('scoreboard', JSON.stringify(newScoreboardData));
      setScoreboardData(newScoreboardData);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const getScoreboardData = async () => {
    try {
      const data = await AsyncStorage.getItem('scoreboard');
      if (data) {
        setScoreboardData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error retrieving scoreboard data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.scoreboardEntry}>
      <Text>{item.name}</Text>
      <Text>{item.date}</Text>
      <Text>{item.score}</Text>
    </View>
  );

  return (
    <View>
      <Header />
      <FlatList
        data={scoreboardData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Footer />
    </View>
  );
}




