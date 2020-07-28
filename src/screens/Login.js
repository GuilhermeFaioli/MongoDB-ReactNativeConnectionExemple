import React, { useEffec, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper'

const Login = ({navigation}) => {
    return (
        <View>
            <TextInput
                label="Email"
                style={styles.inputStyle}
                theme={theme}
                keyboardType="email-address"
                mode="outlined"
            />    
            <TextInput
                label="Password"
                style={styles.inputStyle}
                theme={theme}
                mode="outlined"
                
            />
                    
            <Button mode="contained" theme={theme} style={styles.inputStyle} onPress={() => console.log("Pressed")}>
                Log in
            </Button>
            <Text style={styles.textStyle}>
                Create a new account
            </Text>  
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
    },
    inputStyle: {
        margin: 5,
        marginTop: 13
    },
    textStyle: {
        fontSize: 18,
        margin: 5,
        marginTop: 13
    }
})

export default Login