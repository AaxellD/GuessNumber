import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert, ImageBackground } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const StartScreen = (props) => {
    // manage state
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState('')

    // VALIDATE INPUT
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };
    // RESET BUTTON
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }
    // CONFIRM BUTTON
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        // second Validation
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Choose a number between 1 and 99', [{ text: 'okay', style: 'default', onPress: resetInputHandler }])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };
    // Summary
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You Selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}
                >START GAME</MainButton>
            </Card>
        )
    }

    const image = { uri:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80'}

    return (
        <ImageBackground source={image} style={{width:'100%',height:'100%'}}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>

                <View style={styles.screen}>
                    <Text style={styles.title}>New Game</Text>
                    <Card style={styles.inputContainer}>

                        <View style={styles.inputContainer}>
                            <Text>Select a Number</Text>

                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='numeric'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />

                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <Button
                                        title='Confirm'
                                        color={Colors.primary}
                                        onPress={confirmInputHandler}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        title='Reset'
                                        color={Colors.accent}
                                        onPress={resetInputHandler}
                                    />
                                </View>
                            </View>
                        </View>
                    </Card>
                    {confirmedOutput}

                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}

export default StartScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        marginVertical: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        marginVertical: 20,
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 10,
        alignItems: 'center'
    }
})
