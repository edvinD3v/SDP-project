import { Dimensions, StyleSheet, FlatList, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';
import useRandomIcon from '../../hooks/useRandomIcon';

interface Props {
  x: number;
  y: number;
}

export default function SubtractingGame({ x, y }: Props) {

  const [numColumnsX, setColumnNoX] = useState(1);
  const randomIcon = useRandomIcon(x, y);

  useEffect(() => {
    if (x >= 1 && x <= 2) {
      setColumnNoX(2);
    } else if (x === 3) {
      setColumnNoX(3);
    } else if (x >=4 && x<=8) {
      setColumnNoX(4);
    } else if (x >= 9 && x <= 10) {
      setColumnNoX(5);
    } else if (x >= 11 && x <= 18) {
      setColumnNoX(6);
    } else if (x >= 19 && x <= 21) {
      setColumnNoX(7);
    } else if (x >= 22 && x <= 32) {
      setColumnNoX(8);
    } else {
      setColumnNoX(9);
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
    	
  const renderItem = ({item, index}: {item: any, index: number}) => {
    // Calculate the number of visible items based on dataX length
    const numberOfVisibleItems = dataX.length - Math.ceil(dataX.length / numColumnsX) * numColumnsX + x;
    // Calculate the start index for the elements that should have 50% opacity
    const opacityStartIndex = numberOfVisibleItems - y;
  
    // Check if the current index is within the visible range and apply opacity accordingly
    const itemStyle = index >= opacityStartIndex ? { opacity: 0.45 } : { opacity: 1 };
  
    if (item.empty === true) {
      return <View style={[styles.images, styles.itemInvisible]} />;
    }
    return <Image style={[styles.images, itemStyle]} source={randomIcon}/>
  }
  
    
    
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
          <FlatList
              data={formatData(dataX, numColumnsX)}
              renderItem={renderItem}
              numColumns={numColumnsX}
              key={numColumnsX}>
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
  itemInvisible: {
    backgroundColor: 'transparent' 
  },
});