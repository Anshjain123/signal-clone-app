import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input } from "@rneui/themed"
import { Button } from "@rneui/base";
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
const AddChatScreen = ({ navigation }) => {
    const [input, setinput] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat"
        })
    }, [navigation])
    const createnewchat = async () => {
        await addDoc(collection(db, 'chats'), {
            chatName: input,
        }).then(() => {
            navigation.replace("Home");
        }).catch((err) => alert(err.message));
    }
    return (
        <View style={styles.container}>
            <Input
                autoFocus
                placeholder='Enter a chat name'
                value={input}
                onChangeText={(text) => setinput(text)}
                onSubmitEditing={createnewchat}
                leftIcon={
                    <Ionicons name="ios-chatbubble-ellipses-outline" size={24} color="black" />
                }
            />
            <Button onPress={createnewchat} title="Create New Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%'
    }
})