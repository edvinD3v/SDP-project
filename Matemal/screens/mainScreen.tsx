import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import Gameicon from '../components/gameIcon';

export default function MainScreen() {

  return (
    <ImageBackground source={require('../assets/backgrounds/bg1.jpg')} style={styles.backgroundImage}>
    <View style={styles.gameChooseTable}>
      <View style={styles.tableRow}>
        <Gameicon title={'Counting'}></Gameicon>
        <Gameicon title={'Compare'}></Gameicon>
      </View>
      <View style={styles.tableRow}>
        <Gameicon title={'Adding'}></Gameicon>
        <Gameicon title={'Subtracting'}></Gameicon>
        <Gameicon title={'Multiply'}></Gameicon>
      </View>
      <View style={styles.tableRow}>
        <Gameicon title={'Divide'}></Gameicon>
        <Gameicon title={'Quiz'}></Gameicon>
      </View>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00ABF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    width: 80,
    height: 90,
    borderRadius: 15,
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  gameChooseTable: {
    marginLeft: '40%',
    margin: 10,
    height: '80%',
    alignItems: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 12
  }
});
