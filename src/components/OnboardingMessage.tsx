import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TextStyle } from "react-native";

interface OnboardingMessageProps {
    messages: string[];
    style: TextStyle;
    onComplete?: () => void;
}

const TIMEOUT = 1500;
const fadeoutAnimationConfig: Animated.TimingAnimationConfig = {
    toValue: 0,
    duration: TIMEOUT,
    useNativeDriver: true
}

const fadeinAnimationConfig: Animated.TimingAnimationConfig = {
    toValue: 1,
    duration: TIMEOUT * .5,
    useNativeDriver: true
}

function OnboardingMessage({ messages, style, onComplete }: OnboardingMessageProps) {
    const [currentMessage, setCurrentMessage] = useState<number>(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;


    useEffect(() => {
        Animated.timing(fadeAnim, fadeinAnimationConfig).start();
        if (currentMessage + 1 == messages.length) {
            if (onComplete) onComplete();
            return;
        }

        const timeout = setTimeout(() => {
            Animated.timing(fadeAnim, fadeoutAnimationConfig).start(() => {
                setCurrentMessage(currentMessage + 1);
            });
        }, TIMEOUT);


        return () => clearTimeout(timeout);
    }, [currentMessage, fadeAnim]);

    return <Animated.View style={{ opacity: fadeAnim, paddingHorizontal: 40 }}>
        <Text style={{ ...style, textAlign: 'center', lineHeight: 35 }}>{messages[currentMessage]}</Text>
    </Animated.View>
}

export default OnboardingMessage;