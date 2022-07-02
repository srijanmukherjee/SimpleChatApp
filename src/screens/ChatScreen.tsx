import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { logout } from "../controller/AuthController";
import { firebase } from "@react-native-firebase/firestore";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import LoadingScreen from "./LoadingScreen";

const db = firebase.firestore();
const chatsRef = db.collection("chats");

export default function ChatScreen() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const unsubscribeFirestore = chatsRef.onSnapshot(querySnapshot => {
            const messagesFirestore = querySnapshot
                .docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data();
                    return { ...message, createdAt: message.createdAt.toDate() }
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            appendMessages(messagesFirestore);
        });

        const unsubscribeAuth = auth().onAuthStateChanged((user) => {
            setUser(user);
        })

        return () => {
            unsubscribeFirestore();
            unsubscribeAuth();
        };
    }, []);

    const appendMessages = useCallback((_messages: IMessage[]) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, _messages));
    }, [messages]);

    const handleSend = async (messages: IMessage[]) => {
        const writes = messages.map((_message) => chatsRef.add(_message));
        await Promise.all(writes);
    }

    return <>
        {user ?
            <View style={{ flex: 1 }}>
                <Header
                    centerComponent={{ text: auth().currentUser?.displayName ?? 'Chat', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'logout', color: '#fff', onPress: () => logout() }}
                />
                <GiftedChat
                    messages={messages}
                    alwaysShowSend={true}
                    showUserAvatar={true}
                    renderUsernameOnMessage={true}
                    user={{
                        _id: user.email ?? 0,
                        name: user.displayName ?? undefined,
                        avatar: user.photoURL ?? undefined
                    }}
                    onSend={handleSend}
                />
            </View> :
            <LoadingScreen />
        }
    </>;
}

const styles = StyleSheet.create({});