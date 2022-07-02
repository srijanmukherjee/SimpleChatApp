// @refresh state
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View, Animated, StyleProp, TextStyle, Button, TouchableOpacity } from "react-native";
import OnboardingMessage from "../components/OnboardingMessage";

interface OnboardingScreenProps {
    onOnboardComplete: () => void;
}

function OnboardingScreen({ onOnboardComplete }: OnboardingScreenProps) {
    const [showNextButton, setShowNextButton] = useState<boolean>(false);
    const { width } = Dimensions.get("window");
    const onboardingMessages = ["Welcome", "To the chat app", "Let's get started right away"];


    return <View style={styles.container}>
        <Image
            source={require('../../assets/landing.png')}
            style={{ width: width * .7, height: width * .7, marginTop: -100 }}
        />
        <OnboardingMessage
            messages={onboardingMessages}
            style={styles.onboarding_message}
            onComplete={() => setShowNextButton(true)}
        />
        {showNextButton ?
            <TouchableOpacity
                onPress={onOnboardComplete}
                style={styles.next_btn}>
                <Text style={{ fontSize: 18, color: '#fff' }}>Next</Text>
            </TouchableOpacity> : null}
        <Text style={styles.footer}>Developed with ❣️ by Srijan Mukherjee</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    onboarding_message: {
        marginTop: 100,
        fontSize: 23,
        fontWeight: '200'
    },

    next_btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: '#92e3a9',
    },

    footer: {
        position: 'absolute',
        bottom: 20
    }
});

export default OnboardingScreen;