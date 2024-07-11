import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import Symbol from '../gameComponents/symbol';
import QBox from '../gameComponents/qBox';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Language, translations } from '../../data/translations';

interface Props {
  x: number;
}

export default function CountingGame({ x }: Props) {

  const { language } = useAppSelector(state => state.settings);

  const t = translations[language as Language];
    
  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.hmany}>{t.howMany}</Text>
        
        <View style={styles.qbox}>
          <QBox size = {50}></QBox>
        </View>
        
      </View>
      
      <View style={styles.itemBox}>
        <View style={styles.box}></View>

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
  }
});