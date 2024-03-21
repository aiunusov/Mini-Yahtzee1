import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
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
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/Style';

let board = [];

export default function Gameboard({ navigation, route }) {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  const [playerName, setPlayerName] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [dicesThrown, setDicesThrown] = useState(false); 

  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  useEffect(() => {
    const allPointsSelected = selectedDicePoints.every(point => point);
    if (allPointsSelected) {
      setGameEndStatus(true);
      calculateTotalScore();
    }
  }, [selectedDicePoints]);

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = !dices[i];
    setSelectedDices(dices);
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "black" : "lightpink"
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "black" : "green"
  }

  const selectDicePoints = (i) => {
    if (dicesThrown) { 
      if (nbrOfThrowsLeft === 0) {
        if (!selectedDicePoints[i]) {
          let selectedPoints = [...selectedDicePoints];
          let points = [...dicePointsTotal];
          selectedPoints[i] = true;
          let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
          points[i] = nbrOfDices * (i + 1);
          setDicePointsTotal(points);
          setSelectedDicePoints(selectedPoints);
          setNbrOfThrowsLeft(NBR_OF_THROWS);
          calculateTotalScore(); 
          return points[i];
        } else {
          setStatus('You already selected points for ' + (i + 1));
        }
      } else {
        setStatus("Throw " + NBR_OF_THROWS + " times before setting points.");
      }
    } else {
      setStatus("You must throw the dices before selecting points.");
    }
  }

  const throwDices = () => {
    if (nbrOfThrowsLeft === NBR_OF_THROWS) { 
      calculateTotalScore();
    }
    if (nbrOfThrowsLeft > 0) {
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
          spots[i] = randomNumber;
          board[i] = 'dice-' + randomNumber;
        }
      }
      setDiceSpots(spots);
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setDicesThrown(true); 
    } else {
      setStatus("No throws left. Please select points.");
    }
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  const row = () => {
    const diceComponents = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
      diceComponents.push(
        <Col key={"dice" + dice}>
          <Pressable
            onPress={() => selectDice(dice)}
          >
            <MaterialCommunityIcons
              name={board[dice]}
              size={50}
              color={getDiceColor(dice)}
            />
          </Pressable>
        </Col>
      );
    }
    return diceComponents;
  }

  const pointsRow = () => {
    const pointsComponents = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
      pointsComponents.push(
        <Col key={"pointsRow" + spot}>
          <Text>{getSpotTotal(spot)}</Text>
          </Col>
      )
    }
    return pointsComponents;
  }
  
  const pointsToSelectRow = () => {
    const buttons = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
      buttons.push(
        <Col key={"buttonsRow" + diceButton}>
          <Pressable
            onPress={() => selectDicePoints(diceButton)}
          >
            <MaterialCommunityIcons
              name={"numeric-" + (diceButton + 1) + "-circle"}
              size={35}
              color={getDicePointsColor(diceButton)}
            />
          </Pressable>
        </Col>
      );
    }
    return buttons;
  }

  const calculateTotalScore = () => {
    let total = dicePointsTotal.reduce((acc, curr) => acc + curr, 0);
    if (total >= 63) {
      total += BONUS_POINTS; 
    }
    setTotalScore(total);
    setCurrentScore(total); 
  }

  const restartGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setStatus('Throw dices');
    setGameEndStatus(false);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
    setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    setCurrentScore(0);
    setTotalScore(0);
    setDicesThrown(false); 
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Container>
          <Row>{row()}</Row>
        </Container>
  
        <View style={styles.gameInfo}>
          <Text style={styles.infoText}>Throws left: {nbrOfThrowsLeft}</Text>
          <Text style={styles.infoText}>Current Score: {currentScore}</Text>
          <Text style={styles.infoText}>{status}</Text>
  
          {!gameEndStatus ? (
            <Pressable onPress={() => throwDices()} style={styles.button}>
              <Text style={styles.buttonText}>THROW DICES</Text>
            </Pressable>
          ) : (
            <Text style={styles.infoText}>The game has ended.</Text>
          )}
        </View>
  
        <Container>
          <Row>{pointsRow()}</Row>
        </Container>
  
        <Container>
          <Row>{pointsToSelectRow()}</Row>
        </Container>
  
        <Text style={styles.playerInfo}>Player name: {playerName}</Text>
  
        {gameEndStatus && (
          <View style={styles.endGame}>
            <Text style={styles.infoText}>Total Score: {totalScore}</Text>
            <Pressable onPress={restartGame} style={styles.button}>
              <Text style={styles.buttonText}>Restart Game</Text>
            </Pressable>
          </View>
        )}
      </View>
      <Footer />
    </>
  );
}; 
  
