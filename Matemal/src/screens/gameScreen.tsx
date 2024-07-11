import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import CountingGame from '../components/games/countingGame';
import ComparisonGame from '../components/games/comparisonGame';
import AddingGame from '../components/games/addingGame';
import SubtractingGame from '../components/games/subtractingGame';
import MultiplyGame from '../components/games/multiplyGame';
import DivideGame from '../components/games/divideGame';
import QuizGame from '../components/games/quizGame';
import AnswerMenu from '../components/gameComponents/answerMenu';
import useRandomMathOperation from '../hooks/useRandomMathOperation';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParams } from '../../App';

type GameScreenProps = StackScreenProps<StackParams, 'GameScreen'>;

export default function GameScreen( { route }: GameScreenProps ) {
  const { game } = route.params;

  const { x, y, generateTask } = useRandomMathOperation();

  let GameComponent;
  let operator: string = '';

  switch (game) {
    case 'counting':
      GameComponent = CountingGame;
      operator = 'c';
      break;
    case 'compare':
      GameComponent = ComparisonGame;
      operator = 'com';
      break;
    case 'adding':
      GameComponent = AddingGame;
      operator = '+';
      break;
    case 'subtracting':
      GameComponent = SubtractingGame;
      operator = '-';
      break;
    case 'multiply':
      GameComponent = MultiplyGame;
      operator = '*';
      break;
    case 'divide':
      GameComponent = DivideGame;
      operator = '/';
      break;
    case 'quiz':
      GameComponent = QuizGame;
      operator = 'q';
      break;
    default:
      GameComponent = () => <Text>Unknown Game</Text>;
  }

  useEffect(() => {
    generateTask(operator);
  }, []);

  let z;
  let correctAnswer: string | number;

  switch (operator) {
    case 'c':
      z = x;
      break;
    case 'com':
      if (x < y) {
        z = 1;
        correctAnswer = '<';
      } else if (x > y) {
        z = 3;
        correctAnswer = '>';
      } else {
        z = 2;
        correctAnswer = '=';
      }
      break;
    case '+':
      z = x + y;
      break;
    case '-':
      z = x - y;
      break;
    case '*':
      z = x * y;
      break;
    case '/':
      z = x / y;
      break;
    case 'q':
      z = x + y;
      break;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
  
  if(operator != 'com') {
    correctAnswer = z;
  }


  function generateNumbers(z: number): number[] {
    const possibleNumbers: number[] = [];
  
    for (let i = -3; i <= 3; i++) {
      if (i !== 0) {
        const num = z + i;
        if (num > 0) {
          possibleNumbers.push(num);
        }
      }
    }

    for (let i = possibleNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [possibleNumbers[i], possibleNumbers[j]] = [possibleNumbers[j], possibleNumbers[i]];
    }
  
    const num1 = possibleNumbers[0];
    const num2 = possibleNumbers[1];
  
    const result = [z, num1, num2];
  
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
  
    return result;
  }

  let possibleAnswers;

  if(operator === 'com') {
    possibleAnswers = ['<', '=', '>'];
  } else {
    possibleAnswers = generateNumbers(z);
  }
  
  const handleAnswerSelection = (selectedAnswer: any) => {
    if (selectedAnswer === correctAnswer) {
      generateTask(operator);
    }
  };

  return (
    <ImageBackground source={require('../../assets/backgrounds/bg9.jpg')} style={styles.backgroundImage}>
        <GameComponent x = {x} y = {y} />

        <AnswerMenu ans1 = {possibleAnswers[0]} ans2 = {possibleAnswers[1]} ans3 = {possibleAnswers[2]} onAnswerSelect={handleAnswerSelection}></AnswerMenu>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});