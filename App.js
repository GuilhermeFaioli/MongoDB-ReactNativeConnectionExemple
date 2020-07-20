import Constants from 'expo-constants'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home'
import CreateEmployee from './src/screens/CreateEmployee'
import Profile from './src/screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const myOptions = {
  title: "My Sweet Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff"
  }
}
function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen name="Create" component={CreateEmployee} options={{...myOptions, title: "Create Employee"}} />
        <Stack.Screen name="Profile" component={Profile} options={{...myOptions, title: "Profile"}} />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0'
  },
});
