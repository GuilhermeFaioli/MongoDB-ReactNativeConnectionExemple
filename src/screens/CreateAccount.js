import React, {useState} from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

const CreateAccount = ({navigation}) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [enableShift, setEnableShift] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate)
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
            <KeyboardAvoidingView behavior="position" enabled={enableShift}>
                <TextInput
                    label="Name"
                    style={styles.inputStyle}
                    theme={theme}
                    mode="outlined"
                    onFocus={() => setEnableShift(false)}
                />
                
                <Button mode="contained" style={styles.buttonDate} theme={theme} onPress={showDatepicker} icon="calendar">Birthday</Button>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}


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
                    mode="outlined"
                    onFocus={() => setEnableShift(false)}
                />
                        
                <Button mode="contained" theme={theme} style={styles.inputStyle} onPress={() => console.log("Pressed")}>
                    Sign in
                </Button>
                <TouchableOpacity>
                    <Text style={styles.textStyle}>
                        Already have a account?
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
    },
    buttonDate: {
        width: 130,
        margin: 5,
        marginTop: 13
    }
})

export default CreateAccount