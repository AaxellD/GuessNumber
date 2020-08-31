import React from 'react';
import { StyleSheet, Text} from 'react-native';

const BodyText = (props) => {
    return (
            <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
    )
}

export default BodyText

const styles = StyleSheet.create({
    text:{
        fontFamily:'open-sans-bold',
        fontSize:30
    }
})
