// import react-native-gesture-handler 
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from']);
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import AddChatScreen from './Screens/AddChatScreen';
import ChatScreen from './Screens/ChatScreen';

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: {backgroundColor:"#2C6BED"},
  headeTitleStyle : {color:'white'},
  headerTintColor:"white",
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name = "Login" component={LoginScreen}/>
        <Stack.Screen name = "Register" component={RegisterScreen}/>
        <Stack.Screen name = "Home" component={HomeScreen}/>
        <Stack.Screen name = "addchat" component={AddChatScreen}/>
        <Stack.Screen name = "chat" component={ChatScreen}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
