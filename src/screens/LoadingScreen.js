import React, {useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button, TextInput } from 'react-native-paper'

const LoadingScreen = ({navigation}) => {
    return (
        <View style={styles.root}>
            <ActivityIndicator size="large" color="blue" /> 
        </View>
    )
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center'
    },
})

export default LoadingScreen