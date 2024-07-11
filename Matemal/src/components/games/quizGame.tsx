import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';

export default function QuizGame() {
    
  return (
    <View style={styles.container}>

    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.515,
    height: height * 0.87,
    flexDirection: 'column',
    alignItems: 'center'
  }
});