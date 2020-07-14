import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'

const CreateEmployee = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [picture, setPicture] = useState("")
    const [modal, setModal] = useState(false)
    return (
        <View style={styles.root}>
            <TextInput
                label="Name"
                value={name}
                style={styles.inputStyle}
                theme={theme}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="Email"
                value={email}
                style={styles.inputStyle}
                theme={theme}
                keyboardType="email-address"
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Phone"
                value={phone}
                style={styles.inputStyle}
                theme={theme}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label="Salary"
                value={salary}
                style={styles.inputStyle}
                theme={theme}
                keyboardType="decimal-pad"
                mode="outlined"
                onChangeText={text => setSalary(text)}
            />
            <TextInput
                label="Address"
                value={salary}
                style={styles.inputStyle}
                theme={theme}
                mode="outlined"
                onChangeText={text => setSalary(text)}
            />
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
        margin: 5
    }
})

export default CreateEmployee

