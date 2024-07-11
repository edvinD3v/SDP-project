import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Symbol({ symbol, size, color }: { symbol: any, size: number, color: string }) {
    return (
        <Text style={[styles.text, { fontSize: size, color: color }]}>{symbol}</Text>
    );
}

const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '700',
  }
});
