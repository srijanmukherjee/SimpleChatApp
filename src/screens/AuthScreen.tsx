import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { authenticateGoogle } from "../controller/AuthController";
import LoadingScreen from "./LoadingScreen";

export default function AuthScreen() {
    const [loading, setLoading] = useState<boolean>(false);
    const onSignin = () => {
        setLoading(true);

        authenticateGoogle().catch((err) => {
            setLoading(false);
        })
    }

    return <>
        {loading ?
            <LoadingScreen /> :
            <View style={styles.container}>
                <Text style={styles.header}>Simple Chat App</Text>
                <GoogleSigninButton onPress={onSignin} />
            </View>
        }
    </>
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },

    header: {
        fontSize: 24,
        paddingVertical: 30,
        marginTop: -100
    }
})