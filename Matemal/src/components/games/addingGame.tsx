import { Dimensions, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';
import useRandomIcon from '../../hooks/useRandomIcon';

interface Props {
  x: number;
  y: number;
}

export default function AddingGame({ x, y }: Props) {

  const [numColumnsX, setColumnNoX] = useState(1);
  const [numColumnsY, setColumnNoY] = useState(1);
  const randomIcon = useRandomIcon(x, y);

  useEffect(() => {
    if (x === 1) {
      setColumnNoX(2);
    } else if (x >= 2 && x <= 4) {
      setColumnNoX(2);
    } else if (x >= 5 && x <= 9) {
      setColumnNoX(3);
    } else if (x >= 10 && x <= 16) {
      setColumnNoX(4);
    } else if (x >= 17 && x <= 25) {
      setColumnNoX(5);
    } else if (x >= 26 && x <= 36) {
      setColumnNoX(6);
    }
  }, [x]);

  useEffect(() => {
    if (y === 1) {
      setColumnNoY(2);
    } else if (y >= 2 && y <= 4) {
      setColumnNoY(2);
    } else if (y >= 5 && y <= 9) {
      setColumnNoY(3);
    } else if (y >= 10 && y <= 16) {
      setColumnNoY(4);
    } else if (y >= 17 && y <= 25) {
      setColumnNoY(5);
    } else if (y >= 26 && y <= 36) {
      setColumnNoY(6);
    }
  }, [y]);

  const formatData = (data: any, numColumns: any) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  function createArray(number: any) {
    let newArr = [];
    for (let i = 1; i <= number; i++) {
        newArr.push(i);
    }
    return newArr;
  }
  let dataX = createArray(x);

  let dataY = createArray(y);
    	
  const renderItem = ({item}: {item: any}) => {
    if (item.empty === true) {
      return <View style={[styles.images, styles.itemInvisible]} />;
    }
    return <Image style={[styles.images]} source={randomIcon}/>
  }
    
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
              <FlatList
              data={formatData(dataX, numColumnsX)}
              renderItem={renderItem}
              numColumns={numColumnsX}
              key={numColumnsX}>
              </FlatList>
          </View>

          <View style={styles.itemBox}>
              <FlatList
              data={formatData(dataY, numColumnsY)}
              renderItem={renderItem}
              numColumns={numColumnsY}
              key={numColumnsY}>
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
    aspectRatio: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent' 
  },
})