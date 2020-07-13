import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper'

const Home = () => {
    return (
        <Card style={styles.myCard}>
            <Text style={{fontSize: 22}}>Hello from home</Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
        pedding: 5
    }
})

export default Home