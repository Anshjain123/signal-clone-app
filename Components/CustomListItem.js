import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, } from '@rneui/base/dist/ListItem'
import { Avatar } from '@rneui/base/dist/Avatar'
import { addDoc, collection, doc, serverTimestamp, query, getDocs, orderBy, onSnapshot} from 'firebase/firestore';
import { db } from '../firebase';

// import TouchableScale from 'react-native-touchable-scale';
const CustomListItem = ({ element, enterchat }) => {
    // console.log(element.data.chatName)
    const [messages, setmessages] = useState([])
    useEffect(() => {
        const q = query(collection(db, `chats/${element.id}`, "messages"), orderBy("timeStamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arr = [];
            querySnapshot.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    data: doc.data()
                }
                arr.push(obj);
            })
            setmessages(arr);
        })
        return unsubscribe;
    },[])
    return (

        <ListItem bottomDivider key={element.id} onPress={() => enterchat(element.id, element.data.chatName)} >
            <Avatar
                rounded
                source={{
                    uri: messages[0]?.data?.photoURL || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3b4c26f5-946d-43e9-bf42-d644fbc5788f/d2aducg-87e37df3-cc9a-4eac-8686-2f1dd78138f0.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNiNGMyNmY1LTk0NmQtNDNlOS1iZjQyLWQ2NDRmYmM1Nzg4ZlwvZDJhZHVjZy04N2UzN2RmMy1jYzlhLTRlYWMtODY4Ni0yZjFkZDc4MTM4ZjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GPk33JCmc5czJkjweYjLOd3TVTJenAUIUrPfJdtuZO0"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {element.data.chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {(messages?.[0]?.data?.displayName) || "Start Your chat"}: {messages?.[0]?.data?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>

    )
}

export default CustomListItem

const styles = StyleSheet.create({})