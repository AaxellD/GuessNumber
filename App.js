import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }

  const configureNewGame = () =>{
    setGuessRounds(0);
    setUserNumber(null);
  }

  let content = <StartScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOver roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGame} />
  }

  return (
    <View style={styles.container}>
      <Header title='Guess a Number' />

      {content}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
