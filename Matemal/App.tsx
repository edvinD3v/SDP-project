import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import MainScreen from './screens/mainScreen';
import GameScreen from './screens/gameScreen';

export default function App() {
  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockOrientation();
  }, []);

  return (
    <View style={styles.container}>
      <MainScreen></MainScreen>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
