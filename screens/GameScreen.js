import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;
    // CHECK WIN CONDITION
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, onGameOver, userChoice])

    // NEXT GUESS HANDLER
    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert('Don\'t lie', 'You Know this is wrong!', [{ text: 'sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        // setRounds(rounds + 1);
        setPastGuesses(curPastGuess => [nextNumber, ...curPastGuess])
    }

    const image = { uri: 'https://images.unsplash.com/photo-1563209259-b2fa97148ce1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1257&q=80' }

    return (
        <ImageBackground style={styles.image} source={image}>
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer} >
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name="md-remove" />
                    </MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" />
                    </MainButton>
                </Card>

                <View style={styles.list}>
                    <ScrollView>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses - index))}
                    </ScrollView>
                </View>

            </View>
        </ImageBackground>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '60%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    listItem: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    list: {
        width: '50%',
        flexGrow:1,
        justifyContent:'flex-end'
    }
})
