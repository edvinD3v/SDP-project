import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';

interface Props {
  x: number;
  y: number;
}

export default function SubtractingGame({ x, y }: Props) {
    
  return (
    <View style={styles.container}>
      <View style={styles.task}>
        <Symbol symbol={x} size={70} color='white'></Symbol>
        <Symbol symbol='-' size={70} color='white'></Symbol>
        <Symbol symbol={y} size={70} color='white'></Symbol>
        <Symbol symbol='=' size={70} color='white'></Symbol>

        <View style={styles.qbox}>
        <QBox size = {50}></QBox>
        </View>
      </View>
      
      <View style={styles.itemBox}>
        <View style={styles.box}>

        </View>

      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width * 0.515,
    height: height * 0.87,
    flexDirection: 'column',
  },
  task: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'space-around'
  },
  qbox: {
    height: 100,
  },
  itemBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    height: '95%',
    width: '95%',
    borderWidth: 2,
    borderColor: '#07291b',
    backgroundColor: '#125539',
  }
});