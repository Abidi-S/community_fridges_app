//

import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

//Buttons used for submit on form
export default function FlatButton({ text, onPress, disabled }) {
    return (
        <TouchableOpacity onPress = {onPress} activeOpacity = {disabled ? 0.5 : 1}>
            <View style = {styles.button}>
                <Text style = {styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: '#2699FB'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center'
    }
})