import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Input, Image, Text } from "@rneui/themed";
import { Button } from "@rneui/base";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState()
    const [image, setimage] = useState()

    // useLayoutEffect(()=>{
    //     navigation.setOptions({
    //         headerBackTitle:"Mannu"
    //     })
    // }, [navigation])

    const register = () => {
        // navigation.navigate("Home");
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((authuser) => { 
                updateProfile(authuser.user, {
                    displayName: name,
                    photoURL: image ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                })
            }).catch((err) => alert(err.message))
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autoFocus
                    value={name}
                    onChangeText={(text) => setname(text)}
                />
                <Input
                    placeholder='Email'
                    value={email}
                    keyboardType='email-address'
                    onChangeText={(mail) => setemail(mail)}
                />
                <Input
                    placeholder='Password'
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(pass) => setpassword(pass)}
                />
                <Input
                    placeholder='Profile Picture URL (optional)'

                    value={image}
                    keyboardType='email-address'
                    onChangeText={(img) => setimage(img)}
                    onSubmitEditing={register}
                />
            </View>
            <Button
                title="Register"
                type='outline'
                onPress={register}
                containerStyle={styles.button}
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 200
    },
    inputContainer: {
        width: 300
    }
})