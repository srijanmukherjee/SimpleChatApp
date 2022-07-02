import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import Config from '../config';
import OnboardingScreen from './screens/OnboardingScreen';
import { getData, writeData } from './Storage';
import LoadingScreen from './screens/LoadingScreen';
import AuthScreen from './screens/AuthScreen';
import ChatScreen from './screens/ChatScreen';

enum ScreenState {
  LOADING,
  ONBOARDING,
  LOGIN,
  CHAT
}

interface ConditionalViewProps {
  screenState: ScreenState,
  changeScreenState: (newScreenState: ScreenState) => void;
}

function ConditionalView({ screenState, changeScreenState }: ConditionalViewProps) {

  const onOnboardComplete = () => {
    writeData(Config.STORAGE_KEYS.ONBOARD_COMPLETE, true);
    changeScreenState(ScreenState.LOGIN)
  }

  if (screenState === ScreenState.ONBOARDING) {
    return <OnboardingScreen onOnboardComplete={onOnboardComplete} />
  }

  if (screenState === ScreenState.LOGIN) {
    return <AuthScreen />
  }

  if (screenState === ScreenState.CHAT) {
    return <ChatScreen />
  }

  return <LoadingScreen />
}

const App = () => {
  const [screenState, setScreenState] = useState<ScreenState>(ScreenState.LOADING);

  const showLoginScreen = () => {
    // check if onboarding is complete
    getData(Config.STORAGE_KEYS.ONBOARD_COMPLETE)
      .then((data) => {
        setScreenState(data === null ? ScreenState.ONBOARDING : ScreenState.LOGIN);
      })
      .catch((err) => {
        console.log("Something went wrong while fetching onboarding status");
        console.error(err);
      });
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) setScreenState(ScreenState.CHAT);
      else showLoginScreen();
    });

    return unsubscribe;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ConditionalView screenState={screenState} changeScreenState={setScreenState} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  }
});

export default App;
