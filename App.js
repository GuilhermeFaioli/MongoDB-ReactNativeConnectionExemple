import React, { createContext, useReducer, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home'
import CreateEmployee from './src/screens/CreateEmployee'
import Profile from './src/screens/Profile'
import Login from './src/screens/Login'
import CreateAccount from './src/screens/CreateAccount'
import LoadingScreen from './src/screens/LoadingScreen'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer, initState } from './src/reducers/reducer'
import AsyncStorage from '@react-native-community/async-storage'

//const store = createStore(reducer)

export const MyContext = createContext()

const Stack = createStackNavigator()


const myOptions = {
  title: "My Sweet Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff"
  }
}
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  const [state, dispatch] = useReducer(reducer, initState)

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("teste token antes do if: " + token)
    if (token) {
      setIsLoggedIn(true)
      console.log("setIsLoggedIn: true")
    } else {
      setIsLoggedIn(false)
      console.log("setIsLoggedIn: false")
    }
  }

  useEffect(() => {
    detectLogin()
  }, [])

  return (
    <MyContext.Provider value={
      { state, dispatch }
    }>
      <View style={styles.container}>


        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ ...myOptions, title: "Loading" }} />
            <Stack.Screen name="Home" component={Home} options={myOptions} />
            <Stack.Screen name="Create" component={CreateEmployee} options={{ ...myOptions, title: "Create Employee" }} />
            <Stack.Screen name="Profile" component={Profile} options={{ ...myOptions, title: "Profile" }} />
            <Stack.Screen name="Login" component={Login} options={{ ...myOptions, title: "Sign in" }} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ ...myOptions, title: "Sign up" }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </MyContext.Provider>
  )

}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0'
  },
});
