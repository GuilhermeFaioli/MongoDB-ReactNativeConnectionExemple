import React from 'react'
import { View, Text, StyleSheet, Image, Linking, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons, Entypo } from '@expo/vector-icons'

const Profile = (props) => {
    const {id, name, picture, salary, phone, position, email} = props.route.params.item
    const openDial = () => {
        if(Platform.OS === "android") {
            Linking.openURL("tel: 311234-5678")
        } else {
            Linking.openURL("telprompt: 311234-5678")
        }
    }

    return (
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0033ff", "#6bc1ff"]}
                style={{height: "20%"}}
            />
            <View style={{alignItems: "center"}}>
               <Image 
                    style={{width: 140, height: 140, borderRadius: 140/2, marginTop: -50}}
                    source={{uri: picture}}
                /> 
            </View>
            <View style={{alignItems: "center", margin: 15}}>
                <Title>{name}</Title>
                <Text style={{fontSize: 15}}>{position}</Text>
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
                <Button icon="account-edit" theme={theme} mode="contained" onPress={() => console.log('Pressed')}>
                    Edit
                </Button>
                <Button icon="delete" theme={theme} mode="contained" onPress={() => console.log('Pressed')}>
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
    myText:{
        fontSize: 18
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})