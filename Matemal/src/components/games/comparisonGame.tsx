import { Dimensions, StyleSheet, FlatList, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';
import useRandomIcon from '../../hooks/useRandomIcon';

interface Props {
  x: number;
  y: number;
}

export default function ComparisonGame({ x, y }: Props) {

  const [numColumnsX, setColumnNoX] = useState(1);
  const [numColumnsY, setColumnNoY] = useState(1);
  const randomIcon = useRandomIcon(x, y);

  useEffect(() => {
    if (x >= 1 && x <= 4) {
      setColumnNoX(2);
    } else if (x >= 5 && x <= 12) {
      setColumnNoX(3);
    } else if (x >= 12 && x <= 18) {
      setColumnNoX(4);
    }
  }, [x]);

  useEffect(() => {
    if (y >= 1 && y <= 4) {
      setColumnNoY(2);
    } else if (y >= 5 && y <= 12) {
      setColumnNoY(3);
    } else if (y >= 12 && y <= 18) {
      setColumnNoY(4);
    }
  }, [x]);


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
      <View style={styles.miniContainer}>
        <View style={styles.numberBox}>
            <Symbol symbol={x} size={55} color='white'></Symbol>
          </View>
        <View style={styles.itemBox}>
          <FlatList
                data={formatData(dataX, numColumnsX)}
                renderItem={renderItem}
                numColumns={numColumnsX}
                key={numColumnsX}>
          </FlatList>
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
  images: {
    flex: 1,
    objectFit: 'contain',
    aspectRatio: 1,
  },
  itemInvisible: {
    backgroundColor: '#125539' 
  },
});