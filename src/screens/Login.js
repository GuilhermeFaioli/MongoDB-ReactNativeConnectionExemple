import React, {useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper'

const Login = ({navigation}) => {
    const [enableShift, setEnableShift] = useState(false)
    return (
        <KeyboardAvoidingView>
            <TextInput
                label="Email"
                style={styles.inputStyle}
                theme={theme}
                keyboardType="email-address"
                mode="outlined"
                onFocus={() => setEnableShift(false)}
            />    
            <TextInput
                label="Password"
                style={styles.inputStyle}
                theme={theme}
                secureTextEntry={true}
                mode="outlined"
                onFocus={() => setEnableShift(false)}
                
            />
                    
            <Button mode="contained" theme={theme} style={styles.inputStyle} onPress={() => console.log("Pressed")}>
                Log in
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
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