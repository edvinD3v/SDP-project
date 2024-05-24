import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';

interface GameIconProps {
  title: string;
}

export default function Gameicon(props: GameIconProps) {
  return (
    <View style={[styles.container, styles.shadowProp]}>
        <Text>Image</Text>
        <Text style={styles.title}>{props.title}</Text>
    </View>
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
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {
        width: 6,
        height: 6
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 20
  },
  title: {
    fontSize: 12,
    position: 'absolute', 
    bottom: 5,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  }
});
