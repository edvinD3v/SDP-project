import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface GameIconProps {
  title: string;
}

const images: { [key: string]: any } = {
  counting: require('../../assets/gameIcons/counting.jpg'),
  brojanje: require('../../assets/gameIcons/counting.jpg'),
  compare: require('../../assets/gameIcons/compare.jpg'),
  poređenje: require('../../assets/gameIcons/compare.jpg'),
  adding: require('../../assets/gameIcons/adding.jpg'),
  sabiranje: require('../../assets/gameIcons/adding.jpg'),
  subtracting: require('../../assets/gameIcons/subtracting.jpg'),
  oduzimanje: require('../../assets/gameIcons/subtracting.jpg'),
  multiply: require('../../assets/gameIcons/multiply.jpg'),
  množenje: require('../../assets/gameIcons/multiply.jpg'),
  divide: require('../../assets/gameIcons/divide.jpg'),
  dijeljenje: require('../../assets/gameIcons/divide.jpg'),
  quiz: require('../../assets/gameIcons/quiz.jpg'),
  kviz: require('../../assets/gameIcons/quiz.jpg'),
};

export default function GameIcon(props: GameIconProps) {
  const imageSource = images[props.title.toLowerCase()];

  return (
    <View style={[styles.container, styles.shadowProp]}>
      {imageSource && <Image style={styles.image} source={imageSource} />}
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00ABF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    width: 90,
    height: 110,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {
        width: 6,
        height: 6
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 20
  },
  title: {
    fontSize: 12,
    position: 'absolute', 
    bottom: 5,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  image: {
    resizeMode: 'center',
    width: '85%',
    height: '85%',
    marginTop: -15,
    borderRadius: 15,
  }
});
