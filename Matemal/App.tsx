import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import MainScreen from './src/screens/mainScreen';
import GameScreen from './src/screens/gameScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';

export type StackParams = {
  MainScreen: undefined;
  GameScreen: { game: string };
};

const Stack = createNativeStackNavigator<StackParams>();

export default function App() {

  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockOrientation();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Provider store={ store }>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainScreen" component={MainScreen}/>
            <Stack.Screen name="GameScreen" component={GameScreen}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
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
