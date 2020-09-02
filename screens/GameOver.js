import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';

// Assets/components/constants
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const GameOver = (props) => {

    return (
        <View style={styles.screen}>
            <TitleText>GAME OVER! YAY</TitleText>
            <BodyText>Number of rounds: <Text style={styles.highlight}>{props.roundsNumber}</Text></BodyText>
            <BodyText>Number was: <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>

            <View style={styles.imageContainer}>
                <Image
                    // source={require('../assets/success.png')}
                    source={{uri:'https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'}}
                    style={styles.image}
                    fadeDuration={300}
                />
            </View>
            <BodyText style={styles.resultText}>
                Thank you for playing this wonderful game! Hope you really enjoyed it! To play again, press this reset button!
            </BodyText>

            <View style={styles.resetBox}>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
           
        </View>
    )
}

export default GameOver

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 300,
    },
    imageContainer: {
        width:300,
        height:300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow:'hidden',
        marginVertical:10
    },
    highlight:{
        color:Colors.primary
    },
    resultText:{
        textAlign:'center',
    },
    resetBox:{
        marginTop:10
    }
})
