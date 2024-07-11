import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';

interface Props {
  x: number;
  y: number;
}

export default function AddingGame({ x, y }: Props) {
  
  const generateItems = (count: number) => {
    const items = [];
    for (let i = 1; i <= count; i++) {
      items.push(<Image key={i} source={require('../../../assets/icons/airplane.png')}  />);
    }
    return items;
  };
    
  return (
      <View style={styles.container}>
        <View style={styles.task}>
          <Symbol symbol={x} size={70} color='white'></Symbol>
          <Symbol symbol='+' size={70} color='white'></Symbol>
          <Symbol symbol={y} size={70} color='white'></Symbol>
          <Symbol symbol='=' size={70} color='white'></Symbol>

          <View style={styles.qbox}>
          <QBox size = {50}></QBox>
          </View>
        </View>

        <View style={styles.boxes}>
          <View style={styles.itemBox}>
            <Image style={styles.images} source={require('../../../assets/icons/toytrain.png')} />
            
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
  boxes: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    flex: 1,
    padding: 5
  },
  itemBox: {
    backgroundColor: '#125539',
    width: '49%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#07291b',
  },
  images: {
    flex: 1,
    objectFit: 'contain',
    width: undefined,
    height: undefined,
  }
});