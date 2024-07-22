import { Dimensions, StyleSheet, FlatList, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';
import useRandomIcon from '../../hooks/useRandomIcon';

interface Props {
  x: number;
  y: number;
}

export default function DivideGame({ x, y }: Props) {

  const [numColumns, setColumnNo] = useState(x);
  const randomIcon = useRandomIcon(x, y);

  useEffect(() => {
    setColumnNo(x/y);
  }, [x, y]);

  function createArray(number: any) {
    let newArr = [];
    for (let i = 1; i <= number; i++) {
        newArr.push(i);
    }
    return newArr;
  }

  let data = createArray(x);
    	
  const renderItem = ({item}: {item: any}) => {
    return <Image style={[styles.images]} source={randomIcon}/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.task}>
        <Symbol symbol={x} size={70} color='white'></Symbol>
        <Symbol symbol=':' size={70} color='white'></Symbol>
        <Symbol symbol={y} size={70} color='white'></Symbol>
        <Symbol symbol='=' size={70} color='white'></Symbol>

        <View style={styles.qbox}>
        <QBox size = {50}></QBox>
        </View>
      </View>
      
      <View style={styles.itemBox}>
        <View style={styles.box}>
          <FlatList
              data={data}
              renderItem={renderItem}
              numColumns={numColumns}
              key={numColumns}>
          </FlatList>
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
  },
  images: {
    flex: 1,
    objectFit: 'contain',
    aspectRatio: 1,
  },
});