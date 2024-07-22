import { ImageBackground, StyleSheet, Text, View, Pressable, Modal, Switch } from 'react-native';
import Gameicon from '../components/gameIcon';
import React, { useEffect, useState, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { changeDifficulty, changeLanguage, changeMusic, changeSound } from '../redux/settingsSlice';
import { translations, Language } from '../data/translations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../../App';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

type MainScreenProps = NativeStackScreenProps<StackParams, "MainScreen">

export default function MainScreen({ navigation }: MainScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { language, sound, music, difficulty } = useAppSelector(state => state.settings);
  const [languageValue, setLanguage] = useState(language);
  const [difficultyValue, setDifficulty] = useState(difficulty);
  
  const musicStateRef = useRef<Audio.Sound | null>(null); // Using useRef to keep track of the sound state

  const [soundState, setSound] = useState <any>();

  useEffect(() => {
    return () => {
      // Ensure sound is stopped and unloaded when component unmounts
      if (musicStateRef.current) {
        musicStateRef.current.stopAsync().then(() => {
          musicStateRef.current?.unloadAsync();
          musicStateRef.current = null; // Clear the reference
        });
      }
    };
  }, []);

  const playBackgroundMusic = async () => {
    try {
      const backgroundMusic = new Audio.Sound();
      await backgroundMusic.loadAsync(require('../../assets/sfx/bgMusic.mp3'), { isLooping: true });
      await backgroundMusic.playAsync();
      musicStateRef.current = backgroundMusic; // Store the reference
    } catch (error) {
      console.error('Failed to load background music', error);
    }
  };

  const stopBackgroundMusic = async () => {
    try {
      if (musicStateRef.current) {
        await musicStateRef.current.stopAsync();
        await musicStateRef.current.unloadAsync();
        musicStateRef.current = null; // Clear the reference
      }
    } catch (error) {
      console.error('Failed to stop background music', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (music) {
        playBackgroundMusic();
      } else {
        stopBackgroundMusic();
      }

      return () => {
        stopBackgroundMusic();
      };
    }, [music])
  );

  async function playTransitionSound() {
    if( sound === true ) {
      const { sound } = await Audio.Sound.createAsync( require('../../assets/sfx/woosh.mp3')
      );
      setSound(sound);

      await sound.playAsync();
    }

  }

  useEffect(() => {
    return soundState
      ? () => {
          soundState.unloadAsync();
        }
      : undefined;
  }, [soundState]);

  const toggleSwitchSound = () => {
    dispatch(changeSound({ newSound: !sound }));
  };

  const toggleSwitchMusic = () => {
    dispatch(changeMusic({ newMusic: !music }));
  };
  
  const saveSettings = () => {
    dispatch(changeLanguage({ newLanguage: languageValue }));
    dispatch(changeDifficulty({ newDifficulty: difficultyValue }));
    setIsModalVisible(false);
  };

  const t = translations[language as Language];
  
  const languages = [
    { label: 'Bosanski', value: 'bh' },
    { label: 'English', value: 'en' },
  ];
  
  const difficulties = [
    { label: t.easy, value: 'easy' },
    { label: t.medium, value: 'medium' },
    { label: t.hard, value: 'hard' },
  ];

  return (
    <ImageBackground source={require('../../assets/backgrounds/bg1.jpg')} style={styles.backgroundImage}>
      <Pressable style={styles.settingsButton} onPress={() => setIsModalVisible(true)}>
        <ImageBackground source={require('../../assets/buttonIcons/settings.png')} style={styles.backgroundImageSettings}></ImageBackground>
      </Pressable>
      <View style={styles.gameChooseTable}>
        <View style={styles.tableRow}>
          <Pressable onPress={() => { navigation.navigate("GameScreen", { game: 'counting' }); playTransitionSound();}}>
            <Gameicon title={t.counting}></Gameicon>
          </Pressable>
          <Pressable onPress={() => { navigation.navigate("GameScreen", { game: 'compare' }); playTransitionSound(); }}>
            <Gameicon title={t.compare}></Gameicon>
          </Pressable>
        </View>
        <View style={styles.tableRow}>
        <Pressable onPress={() => { navigation.navigate("GameScreen", { game: 'adding' }); playTransitionSound(); }}>
            <Gameicon title={t.adding}></Gameicon>
          </Pressable>
          <Pressable onPress={() => { navigation.navigate("GameScreen", { game: 'subtracting' }); playTransitionSound(); }}>
            <Gameicon title={t.subtracting}></Gameicon>
          </Pressable>
          <Pressable onPress={() => { navigation.navigate("GameScreen", { game: 'multiply' }); playTransitionSound(); }}>
            <Gameicon title={t.multiply}></Gameicon>
          </Pressable>
        </View>
        <View style={styles.tableRow}>
        <Pressable onPress={() => { navigation.navigate("GameScreen", { game: 'divide' }); playTransitionSound(); }}>
            <Gameicon title={t.divide}></Gameicon>
          </Pressable>
          <Pressable onPress={() => { navigation.navigate("GameScreen", { game: 'quiz' }); playTransitionSound(); }}>
            <Gameicon title={t.quiz}></Gameicon>
          </Pressable>
        </View>
      </View>
      <Modal transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <View style={styles.flexCenter}>
              <Text style={styles.settingsLabel}>{t.settings}</Text>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingName}>{t.language}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={languages}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={languageValue}
                value={languageValue}
                onChange={item => {
                  setLanguage(item.value);
                }}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingName}>{t.difficulty}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={difficulties}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={difficultyValue}
                value={difficultyValue}
                onChange={item => {
                  setDifficulty(item.value);
                }}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={[styles.settingName]}>{t.music}</Text>
              <Switch style={styles.switch}
              onValueChange={toggleSwitchMusic}
              value={music}
              ></Switch>

              <Text style={styles.settingName}>{t.sound}</Text>
              <Switch style={styles.switch}
              onValueChange={toggleSwitchSound}
              value={sound}
              ></Switch>
            </View>

            <View style={styles.flexCenter}>
              <Pressable style={styles.saveButton} onPress={saveSettings}>
                <Text>{t.save}</Text>
              </Pressable>
            </View>

          </View>

        </View>

      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00ABF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    width: 80,
    height: 90,
    borderRadius: 15,
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  backgroundImageSettings: {
    width: '100%',
    height: '100%',
  },
  settingsButton: {
    backgroundColor: "#00ABF0",
    margin: 10,
    padding: 8,
    width: 70,
    height: 70,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameChooseTable: {
    marginLeft: '40%',
    marginTop: -60,
    margin: 10,
    height: '80%',
    alignItems: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 12
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '55%',
    height: '80%',
    padding: 20,
    backgroundColor: '#16744f',
    borderRadius: 10,
    borderWidth: 13,
    borderColor: '#f18a3d',
    alignItems: 'flex-start',
  },
  flexCenter: {
    width: '100%',
    alignItems: 'center'
  },
  settingsLabel: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white'
  },
  settingRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 50,
    width: '100%',
  },
  settingName: {
    color: 'white',
    fontSize: 20,
    width: 100,
  },
  dropdown: {
    height: 40,
    marginLeft: 30,
    marginTop: -5,
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  switch: {
    marginTop: -7,
    marginRight: 20,
    marginLeft: 20,
  },
  saveButton: {
    marginTop: 15,
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f18a3d'
  }
});
