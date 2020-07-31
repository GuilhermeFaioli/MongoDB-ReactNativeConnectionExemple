import React from 'react'
import { View, Text, StyleSheet, Image, Linking, Platform, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import CreateEmployee from './CreateEmployee'

const Profile = (props) => {
    const { _id, name, picture, salary, phone, position, email } = props.route.params.item
    const deleteEmployee = () => {
        fetch("http://10.0.2.2:3000/delete", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: _id
            })
        }).then(res => res.json())
            .then(deletedEmp => {
                Alert.alert(`${deletedEmp.name} deleted`)
                props.navigation.navigate("Home")
            }).catch(err => {
                Alert.alert("someting went wrong")
            })
    }
    const openDial = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel: ${phone}`)
        } else {
            Linking.openURL(`telprompt: ${phone}`)
        }
    }

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#0033ff", "#6bc1ff"]}
                style={{ height: "20%" }}
            />
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 140 / 2, marginTop: -50 }}
                    source={{ uri: picture }}
                />
            </View>
            <View style={{ alignItems: "center", margin: 15 }}>
                <Title>{name}</Title>
                <Text style={{ fontSize: 15 }}>{position}</Text>
            </View>
            <Card style={styles.myCard} onPress={() => {
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={24} color="#006aff" />
                    <Text style={styles.myText}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.myCard} onPress={() => openDial()}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={24} color="#006aff" />
                    <Text style={styles.myText}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={24} color="#006aff" />
                    <Text style={styles.myText}>{salary}</Text>
                </View>
            </Card>

            <View style={styles.buttonView}>
                <Button icon="account-edit" theme={theme} mode="contained"
                    onPress={() => {
                        props.navigation.navigate("Create",
                            { _id, name, picture, salary, phone, position, email })
                    }
                    }>
                    Edit
                </Button>
                <Button icon="delete" theme={theme} mode="contained" onPress={() => deleteEmployee()}>
                    Fire employee
                </Button>
            </View>
        </View>
    )
}

export default Profile

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    myCard: {
        margin: 3
    },
    cardContent: {
        flexDirection: "row",
        padding: 8
    },
    myText: {
        fontSize: 18
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})