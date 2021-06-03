import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './Styles';
import AsyncStorage from '@react-native-community/async-storage';
import { CabinetItem } from './CabinetItem';
import { IsValidKey } from '../Common/CommonMethod'
import { Dogs } from '../Common/Dogs'

export class CabinetScreen extends React.Component {
  state = {
    isVisible: false
  };
  displayModal(show) {
    this.setState({ isVisible: show })
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      data: 0,
      selectedDog: Dogs.Normal
    }
    this.LoadData();
  }

  LoadData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    keys.sort(function (a, b) {
      return b - a;
    });

    let loadedData = [];
    for (let i = 0; i < keys.length; i++) {
      if (!IsValidKey(keys[i])) {
        continue;
      }

      const value = await AsyncStorage.getItem(keys[i]);
      loadedData.push({
        time: keys[i],
        content: value
      });
    }

    const selectedDog = await AsyncStorage.getItem("SelectedDog");
    this.state.selectedDog = selectedDog;

    this.setState({
      isLoad: true,
      data: { loadedData }
    });
  }

  render() {
    if (!this.state.isLoad) {
      return (
        <ScrollView></ScrollView>
      )
    }

    const ItemList = this.state.data.loadedData;
    const navigation = this.props.navigation;
    return (
      <ScrollView>
        <View style={[styles.container]}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>
            <View>
              <Text style={[styles.text]}>
                글감 선택화면
              </Text>
              <Text
                style={[styles.closeText]}
                onPress={() => {
                  this.displayModal(!this.state.isVisible);
                }}>
                  닫기
                </Text>
            </View>

          </Modal>

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              this.displayModal(true);
            }}>
            <Text style={[styles.buttonText]}>글감</Text>
          </TouchableOpacity>
        </View>
        {
          ItemList.map((value) =>
            <CabinetItem
              selectedDog={this.state.selectedDog}
              key={value.time}
              navigation={navigation}
              writingTime={value.time}
              content={value.content} />)
        }
      </ScrollView>
    )
  }
};