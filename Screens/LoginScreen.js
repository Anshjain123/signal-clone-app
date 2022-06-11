import { StyleSheet, Text, View, TouchableOpacity,KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input, Image } from "@rneui/themed"
import { Button } from "@rneui/base";
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({navigation}) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState();
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authuser) => {
            if(authuser) {
                navigation.replace("Home"); 
            }
        })
        return unsubscribe;
    }, [])

    const Signin =()=>{
        signInWithEmailAndPassword(auth, email, password)
        .catch((err)=> alert(err.message))
    }
    return (
        <KeyboardAvoidingView  style = {styles.container}>
            <StatusBar style='light' />
            <Image
                source={{
                    uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email'
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setemail(text)}
                />
                <Input placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password) => setpassword(password)}
                    onSubmitEditing={Signin}
                />
            </View>
            <TouchableOpacity>
                <Button title="Login" containerStyle = {styles.button} onPress={Signin}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Button title="Register" type="outline" onPress={()=>navigation.navigate("Register")} containerStyle = {styles.button}/>
            </TouchableOpacity>
            <View style = {{height:20}}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer: {
        width:300
    },
    button: {
        margin:5,
        width:200, 
        alignSelf:'center'
    }

})