import { ImageBackground, StyleSheet, Text, View, Pressable, Modal, Switch, BackHandler } from 'react-native';
import Gameicon from '../components/gameIcon';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { changeLanguage, changeSound } from '../redux/settingsSlice';
import { translations, Language } from '../data/translations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../../App';

type MainScreenProps = NativeStackScreenProps<StackParams, "MainScreen">

export default function MainScreen({ navigation }: MainScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { language, sound } = useAppSelector(state => state.settings);

  const [value, setValue] = useState(language);

  const toggleSwitch = () => {
    dispatch(changeSound({ newSound: !sound }));
  }
  
  const saveSettings = () => {
    dispatch(changeLanguage({ newLanguage: value }));
    setIsModalVisible(false);
  }
  
  const languages = [
    { label: 'Bosanski', value: 'bh' },
    { label: 'English', value: 'en' },
  ];

  const t = translations[language as Language];

  return (
    <ImageBackground source={require('../../assets/backgrounds/bg1.jpg')} style={styles.backgroundImage}>
      <Pressable style={styles.settingsButton} onPress={() => setIsModalVisible(true)}>
        <ImageBackground source={require('../../assets/buttonIcons/settings.png')} style={styles.backgroundImageSettings}></ImageBackground>
      </Pressable>
      <View style={styles.gameChooseTable}>
        <View style={styles.tableRow}>
          <Pressable onPress={() => navigation.navigate("GameScreen", { game: 'counting' })}>
            <Gameicon title={t.counting}></Gameicon>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("GameScreen", { game: 'compare' })}>
            <Gameicon title={t.compare}></Gameicon>
          </Pressable>
        </View>
        <View style={styles.tableRow}>
        <Pressable onPress={() => navigation.navigate("GameScreen", { game: 'adding' })}>
            <Gameicon title={t.adding}></Gameicon>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("GameScreen", { game: 'subtracting' })}>
            <Gameicon title={t.subtracting}></Gameicon>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("GameScreen", { game: 'multiply' })}>
            <Gameicon title={t.multiply}></Gameicon>
          </Pressable>
        </View>
        <View style={styles.tableRow}>
        <Pressable onPress={() => navigation.navigate("GameScreen", { game: 'divide' })}>
            <Gameicon title={t.divide}></Gameicon>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("GameScreen", { game: 'quiz' })}>
            <Gameicon title={t.quiz}></Gameicon>
          </Pressable>
        </View>
      </View>
      <Modal transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.settingsLabel}>{t.settings}</Text>
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
                placeholder={value}
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingName}>{t.sound}</Text>
              <Switch style={styles.switch}
              onValueChange={toggleSwitch}
              value={sound}
              ></Switch>
            </View>

            <Pressable style={styles.saveButton} onPress={saveSettings}>
              <Text>{t.save}</Text>
            </Pressable>

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
    alignItems: 'center',
  },
  settingsLabel: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white'
  },
  settingRow: {
    flexDirection: 'row',
    marginTop: 30,
  },
  settingName: {
    color: 'white',
    fontSize: 20,
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
    marginRight: 130,
    marginLeft: 50,
  },
  saveButton: {
    marginTop: 40,
    width: 150,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f18a3d'
  }
});
