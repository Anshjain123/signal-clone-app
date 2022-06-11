import React, { Component, useLayoutEffect, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import CustomListItem from '../Components/CustomListItem';
import { auth, db } from '../firebase';
import { Avatar } from '@rneui/base/dist/Avatar'
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
const HomeScreen = ({ navigation }) => {
  const [chats, setchats] = useState([])

  const Signout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login")
      })
  }
  useLayoutEffect(() => {
    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        const obj = {
          id: doc.id,
          data: doc.data()
        }
        arr.push(obj);
      })
      setchats(arr);
    })
    return unsubscribe;
  }, [navigation])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={Signout}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 70, marginRight: 15 }}>
          <TouchableOpacity>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("addchat")}>
            <EvilIcons name="pencil" size={32} color="black" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const enterchat = (id, chatName) => {
    navigation.navigate("chat", {
      id: id,
      chatName: chatName
    })
  }

  return (
    <View>
      <StatusBar style='auto' />
      <ScrollView style={styles.container}>
        {chats.map((element, index) => (
          <CustomListItem key={index} element={element} enterchat={enterchat} />
        ))}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
})