import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-community/async-storage'

const Login = ({ navigation }) => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [enableShift, setEnableShift] = useState(false)

    const sendCred = () => {
        fetch("http://10.0.2.2:3000/signin", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(res => res.json()).then(async data => {
            try {
                await AsyncStorage.setItem('token', data.token)
                navigation.replace("Home")
            } catch (e) {
                console.log("Error: " + e)
                Alert.alert("Email or password incorrect")
            }
        })

    }

    return (
        <KeyboardAvoidingView behavior="position" enabled={enableShift}>
            <TextInput
                label="Email"
                style={styles.inputStyle}
                theme={theme}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                mode="outlined"
                onFocus={() => setEnableShift(false)}
            />
            <TextInput
                label="Password"
                style={styles.inputStyle}
                theme={theme}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                mode="outlined"
                onFocus={() => setEnableShift(false)}

            />

            <Button mode="contained" theme={theme} style={styles.inputStyle} onPress={() => sendCred()}>
                Log in
            </Button>
            <TouchableOpacity onPress={() => navigation.replace("CreateAccount")}>
                <Text style={styles.textStyle}>
                    Create a new account
                </Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
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