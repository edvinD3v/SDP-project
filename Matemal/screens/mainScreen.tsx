import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Gameicon from '../components/gameIcon';
import React, { useState } from 'react';

export default function MainScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ImageBackground source={require('../assets/backgrounds/bg1.jpg')} style={styles.backgroundImage}>
    <Pressable style={styles.settingsButton} onPress={() => setIsModalVisible(true)}>
      <ImageBackground source={require('../assets/buttonIcons/settings.png')} style={styles.backgroundImageSettings}></ImageBackground>
    </Pressable>
    <View style={styles.gameChooseTable}>
      <View style={styles.tableRow}>
        <Gameicon title={'Counting'}></Gameicon>
        <Gameicon title={'Compare'}></Gameicon>
      </View>
      <View style={styles.tableRow}>
        <Gameicon title={'Adding'}></Gameicon>
        <Gameicon title={'Subtracting'}></Gameicon>
        <Gameicon title={'Multiply'}></Gameicon>
      </View>
      <View style={styles.tableRow}>
        <Gameicon title={'Divide'}></Gameicon>
        <Gameicon title={'Quiz'}></Gameicon>
      </View>
    </View>
    <Modal transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.settingsLabel}>Settings</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingName}>Language: </Text>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingName}>Sound: </Text>
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
    width: '60%',
    height: '85%',
    padding: 20,
    backgroundColor: '#16744f',
    borderRadius: 10,
    borderWidth: 13,
    borderColor: '#f18a3d',
    alignItems: 'center',
  },
  settingsLabel: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white'
  },
  settingRow: {
    flexDirection: 'row',
    marginTop: 30,
  },
  settingName: {
    color: 'white',
    fontSize: 25,
  }
});
