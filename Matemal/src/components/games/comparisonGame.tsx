import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';

interface Props {
  x: number;
  y: number;
}

export default function ComparisonGame({ x, y }: Props) {
    
  return (
    <View style={styles.container}>
      <View style={styles.miniContainer}>
        <View style={styles.numberBox}>
            <Symbol symbol={x} size={55} color='white'></Symbol>
          </View>
        <View style={styles.itemBox}>

        </View>

      </View>
      

      <View style={styles.qbox}>
        <QBox size={40}></QBox>

      </View>

      <View style={styles.miniContainer}>
        <View style={styles.numberBox}>
            <Symbol symbol={y} size={55} color='white'></Symbol>
          </View>
        <View style={styles.itemBox}>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  miniContainer: {
    flex: 1,
    height: '100%'
  },
  itemBox: {
    backgroundColor: '#125539',
    borderWidth: 2,
    borderColor: '#07291b',
    flex: 1,
  },
  numberBox: {
    alignItems: 'center',
    backgroundColor: '#083c26',
    borderWidth: 2,
    borderColor: '#052316',
  },
  qbox: {
    paddingHorizontal: 2,
    height: 70,
  },
});