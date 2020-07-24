import React, { useEffec, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { MyContext } from '../../App'

const Home = ({navigation}) => {

    //forma de passar dados sem redux
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)
    // const dispatch = useDispatch()
    // const { data, loading } = useSelector((state) => {
    //     return state
    // })

    const {state, dispatch} = useContext(MyContext)
    const {data,loading} = state

    const fetchData = () => {
        fetch("http://10.0.2.2:3000/").then(res => res.json()).then(results => {

            //forma de passar dados sem redux
            // setData(results)
            // setLoading(false)

            dispatch({type: "ADD_DATA", payload: results})
            dispatch({type: "SET_LOADING", payload: false})
        }).catch(err=>{
            Alert.alert("someting went wrong")
        })
    }

    useEffect(() => {
        fetchData()
    },[])
    const renderList = ((item) => {
        return (
            <Card style={styles.myCard} onPress={() => navigation.navigate("Profile", {item})}>
                <View style={styles.cardView}>
                    <Image 
                    style={{width: 60, height: 60, borderRadius: 30}}
                    source={{uri: item.picture}}
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
                keyExtractor={item => `${item._id}`}
                onRefresh={() => fetchData()}
                refreshing={loading}
            />
            
            
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors: {accent: "#006aff"}}}
                onPress={() => navigation.navigate("Create")}
                //props.navigation.navigate("Create") o navigation foi desestruturado das props
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