import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';

interface Props {
  x: number;
  y: number;
  operator: string;
}

export default function QuizGame({ x, y, operator }: Props) {

  if(operator === '*') {
    operator = '⋅';
  } else if (operator === '/') {
    operator = ':';
  }
    
  return (
    <View style={styles.container}>
      <Symbol symbol={x} size={70} color='white'></Symbol>
      <Symbol symbol={operator} size={70} color='white'></Symbol>
      <Symbol symbol={y} size={70} color='white'></Symbol>
      <Symbol symbol={'='} size={70} color='white'></Symbol>

      <View style={styles.qbox}>
          <QBox size = {50}></QBox>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.515,
    height: height * 0.87,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  qbox: {
    height: 100,
  },
});