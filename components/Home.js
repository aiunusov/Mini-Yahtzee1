import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/Style';
import Header from './Header';
import Footer from './Footer';
import { 
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT 
} from '../constans/Game';

export default function Home({ navigation }) {
  const [playerName, setPlayerName] = useState('');
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if(value.trim().length > 0){
      setHasPlayerName(true);
      Keyboard.dismiss();
    }
  }

  const navigateBackToNameInput = () => {
    setHasPlayerName(false);
  }

  return (
   <>
      <Header />
      <View style={styles.container}>
        {hasPlayerName && (
          <MaterialCommunityIcons
              name="information"
              size={90}
              color="green"
              style={styles.icon}
          />
        )}
        {hasPlayerName && (
          <Pressable 
            onPress={navigateBackToNameInput} 
            style={styles.leftTopButton}>
          <MaterialCommunityIcons
              name="arrow-left-circle"
              size={40}
              color="gray"
              style={styles.icon}
          />
        </Pressable>
        )}
        {!hasPlayerName ? 
          <>
            <Text style={styles.label}>Enter your name!</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setPlayerName}
              autoFocus={true}
            />
            <Pressable onPress={() => handlePlayerName(playerName)} style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </>
          :
          <>
            <Text style={[styles.label, styles.ruleTitle]}>Rules of the game</Text>
            <Text style={styles.rulesText}>
              THE GAME: Upper section of the classic Yahtzee
              dice game. You have {NBR_OF_DICES} dices and
              for the every dice you have {NBR_OF_THROWS}
              throws. After each throw you can keep dices in
              order to get same dice spot counts as many as
              possible. In the end of the turn you must select
              your points from {MIN_SPOT} to {MAX_SPOT}.
              Game ends when all points have been selected.
              The order for selecting those is free.
              POINTS: After each turn game calculates the sum
              for the dices you selected. Only the dices having
              the same spot count are calculated. Inside the
              game you can not select same points from
              {MIN_SPOT} to {MAX_SPOT} again.
              GOAL: To get points as much as possible.
              {BONUS_POINTS_LIMIT} points is the limit of
              getting bonus which gives you {BONUS_POINTS}
              points more.
            </Text>
            <Text style={[styles.label, styles.goodLuck]}>Good luck, {playerName}</Text>
            <Pressable onPress={() => navigation.navigate('Gameboard', {player: playerName})} style={styles.playButton}>
              <Text style={styles.buttonText}>PLAY</Text>
            </Pressable> 
          </>
        }
      </View>
      <Footer/>
   </>
  )
}



