import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  size: number;
}

export default function QBox({ size }: Props) {
    
    return (
        <View style={styles.container}>
            <Text style={[styles.qmark, {fontSize: size}]}>?</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b402a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#07291b',
    aspectRatio: 1,
    flex: 1
  },
  qmark: {
    fontWeight: '700',
    color: 'white',
  }
});