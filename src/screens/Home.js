import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, FAB } from 'react-native-paper'

const Home = (props) => {
    const data = [
        {id: 1, name: "Guilherme", position: "Mobile Dev"},
        {id: 2, name: "Ana", position: "Web Dev"},
        {id: 3, name: "Thiago", position: "Software Engenier"},
        {id: 4, name: "Natalia", position: "ML expert"}
    ]
    const renderList = ((item) => {
        return (
            <Card style={styles.myCard}>
                <View style={styles.cardView}>
                    <Image 
                    style={{width: 60, height: 60, borderRadius: 30}}
                    source={{uri: "https://images.unsplash.com/photo-1551712702-4b7335dd8706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"}}
                    //Image from: https://unsplash.com/
                    />
                    <View style={{marginLeft: 10}}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    })
    return (
        <View style={{flex: 1}}>
            <FlatList 
                data={data}
                renderItem={({item}) => {
                    return renderList(item)
                }}
                keyExtractor={item => `${item.id}`}
            />
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors: {accent: "#006aff"}}}
                onPress={() => props.navigation.navigate("Create")}
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
        
    },
    cardView: {
        flexDirection: "row",
        padding: 6,
    },
    text:{
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})

export default Home