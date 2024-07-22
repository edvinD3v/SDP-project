import { Dimensions, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Language, translations } from '../../data/translations';
import useRandomIcon from '../../hooks/useRandomIcon';

interface Props {
  x: number;
}

export default function CountingGame({ x }: Props) {

  const [numColumnsX, setColumnNoX] = useState(1);
  const randomIcon = useRandomIcon(x, 1);

  useEffect(() => {
    if (x === 1) {
      setColumnNoX(2);
    } else if (x >= 2 && x <= 3) {
      setColumnNoX(3);
    } else if (x >= 4 && x <= 8) {
      setColumnNoX(4);
    } else if (x >= 9 && x <= 10) {
      setColumnNoX(5);
    } else if (x >= 11 && x <= 16) {
      setColumnNoX(6);
    } else {
      setColumnNoX(7);
    }
  }, [x]);


  const { language } = useAppSelector(state => state.settings);

  const t = translations[language as Language];

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
    	
  const renderItem = ({item}: {item: any}) => {
    if (item.empty === true) {
      return <View style={[styles.images, styles.itemInvisible]} />;
    }
    return <Image style={[styles.images]} source={randomIcon}/>
  }
    
  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.hmany}>{t.howMany}</Text>
        
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
  question: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around'
  },
  hmany: {
    fontSize: height*0.125,
    color: 'white',
    marginRight: 20,
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
    backgroundColor: '#125539' 
  },
});