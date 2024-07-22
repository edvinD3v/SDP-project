import { StyleSheet, View, Pressable, Text, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Symbol from './symbol';
import { Audio } from 'expo-av';
import { useAppSelector } from '../../hooks/useAppSelector';

const { width, height } = Dimensions.get('window');

interface Props {
  ans1: any;
  ans2: any;
  ans3: any;
  correctAnswer: any;
  onAnswerSelect: (answer: number) => void;
}

export default function AnswerMenu({ ans1, ans2, ans3, correctAnswer, onAnswerSelect }: Props) {

  const { sound } = useAppSelector(state => state.settings);

  const [soundState, setSound] = useState <any>();

  async function playSound( answer: number ) {
    if( sound === true ) {
      let soundObject: Audio.Sound | null = null;

      if( answer === correctAnswer ) {
        const { sound } = await Audio.Sound.createAsync( require('../../../assets/sfx/correct.mp3'));
        soundObject = sound;
      } else {
        const { sound } = await Audio.Sound.createAsync( require('../../../assets/sfx/incorrect.mp3'));
        soundObject = sound;
      }

      setSound(soundObject);

      await soundObject.playAsync();
    }
  }

  useEffect(() => {
    return soundState
      ? () => {
          soundState.unloadAsync();
        }
      : undefined;
  }, [soundState]);

  const symbolSize = Math.min(width * 0.15, height * 0.17);
  

  return (
      <View style={styles.container}>
          <Pressable style={[styles.button, { backgroundColor: '#8fddf7', borderColor: '#004db5' }]} android_disableSound={true} onPress={() => {onAnswerSelect(ans1); playSound(ans1)}}>
              <Symbol symbol={ans1} size={symbolSize} color='black'></Symbol>   
          </Pressable>

          <Pressable style={[styles.button, { backgroundColor: '#f99eb0', borderColor: '#970127' }]} android_disableSound={true} onPress={() => {onAnswerSelect(ans2); playSound(ans2)}}>
              <Symbol symbol={ans2} size={symbolSize} color='black'></Symbol>          
          </Pressable>

          <Pressable style={[styles.button, { backgroundColor: '#cbf18e', borderColor: '#148f00' }]} android_disableSound={true} onPress={() => {onAnswerSelect(ans3); playSound(ans3)}}>
              <Symbol symbol={ans3} size={symbolSize} color='black'></Symbol>   
          </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    height: '95%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000D9',
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 3,
    position: 'absolute',
    right: '4%',
  },
  button: {
    width: width * 0.135,
    height: '28%',
    borderRadius: 8,
    borderColor: 'yellow',
    borderWidth: 8,    
    alignItems: 'center',
    justifyContent: 'center',
  }
});
