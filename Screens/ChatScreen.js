import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons';
import { Avatar } from '@rneui/base';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedbackBase } from 'react-native';
import { addDoc, collection, doc, serverTimestamp, query, getDocs, orderBy, onSnapshot} from 'firebase/firestore';
import * as firebase from 'firebase/app'
import { auth, db } from '../firebase';

const ChatScreen = ({ route, navigation }) => {
    const [input, setinput] = useState("")
    const [messages, setmessages] = useState([])
    const [cnt, setcnt] = useState(0)
    const { id, chatName } = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",

            headerTitle: () => (
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: -20 }}>
                    <Avatar
                        rounded
                        source={{ uri: messages[0]?.data.photoURL ||"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3b4c26f5-946d-43e9-bf42-d644fbc5788f/d2aducg-87e37df3-cc9a-4eac-8686-2f1dd78138f0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNiNGMyNmY1LTk0NmQtNDNlOS1iZjQyLWQ2NDRmYmM1Nzg4ZlwvZDJhZHVjZy04N2UzN2RmMy1jYzlhLTRlYWMtODY4Ni0yZjFkZDc4MTM4ZjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GPk33JCmc5czJkjweYjLOd3TVTJenAUIUrPfJdtuZO0" }}
                    />
                    <Text style={{ color: 'white', margin: 10, fontSize: 18 }}>{chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 70, margin: 10 }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
            // headerLeft: () => (
            //     <View>
            //         <TouchableOpacity
            //             onPress={() => navigation.goBack()}
            //             style={{ marginLeft: -10, marginRight: 10 }}
            //         >
            //             <Feather name="arrow-left" size={24} color="white" />
            //         </TouchableOpacity>
            //     </View>
            // ),

        })
    }, [navigation, messages])
    const sendMessage = () => {
        addDoc(collection(db, `chats/${id}`, "messages"), {
            timeStamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setcnt(cnt + 1);
        setinput('');
    }


    useLayoutEffect(() => {

        const q = query(collection(db, `chats/${id}`, "messages"), orderBy("timeStamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot)=>{
            const arr = []; 
            querySnapshot.forEach((doc)=>{
                const obj = {
                    id:doc.id,
                    data:doc.data()
                }
                arr.push(obj); 
            })
            setmessages(arr); 
        })
        return unsubscribe; 
    }, [route]);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Text style={{ display: 'none' }}>
                {cnt}
            </Text>
            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={90}
            >

                <ScrollView style={{ paddingTop: 15 }}>
                    {messages.map(({ id, data }) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.reciever}>
                                <Avatar
                                    position="absolute"
                                    rounded
                                    size={25}
                                    bottom={-10}
                                    right={-15}
                                    // for web this is not gonna work we have to use containerStyle for this 
                                    containerStyle={{
                                        position: 'absolute',
                                        right: -15,
                                        bottom: -10
                                    }}
                                    source={{ uri: data.photoURL }}

                                />
                                <Text style={styles.recieverText}>{data.message}</Text>
                            </View>
                        ) : (
                            <View key={id} style={styles.sender}>
                                <Avatar
                                    position="absolute"
                                    rounded
                                    size={25}
                                    bottom={-10}
                                    right={-15}
                                    // for web this is not gonna work we have to use containerStyle for this 
                                    containerStyle={{
                                        position: 'absolute',
                                        left: -15,
                                        bottom: -10
                                    }}
                                    source={{ uri: data.photoURL }}
                                />
                                <Text style={styles.senderText}>{data.message}</Text>
                                <Text style={styles.senderName}>{data.displayName}</Text>
                            </View>
                        )
                    ))}


                </ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        multiline={true}
                        numberOfLines={2}
                        value={input}
                        onChangeText={(text) => setinput(text)}
                        placeholder="Signal Message"
                        onSubmitEditing={sendMessage}
                        style={styles.textinput}

                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons name="send" size={24} color="#2868E6" />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textinput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderRadius: 30,
        backgroundColor: '#ECECEC',
        color: 'black',
        padding: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 15,
        justifyContent: 'space-between'
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    senderName:{
        left:10, 
        paddingRight:10,
        fontSize:10,
        color:'white', 
    }, 
    senderText:{
        fontWeight:'500',
        marginLeft:10, 
        marginBottom:15, 
        color:'white' 
    },
    recieverText:{
        fontWeight:'500',
        marginLeft:10, 
    }
})