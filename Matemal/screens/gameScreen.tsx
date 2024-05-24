import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function GameScreen() {

  return (
    <ImageBackground source={require('../assets/backgrounds/bg9.jpg')} style={styles.backgroundImage}>
        <View>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flexDirection: 'row'
  }
});