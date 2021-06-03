import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './Styles';
import Modal from 'react-native-simple-modal';
import AsyncStorage from '@react-native-community/async-storage';
import { CabinetItem } from './CabinetItem';
import { IsValidKey } from '../Common/CommonMethod'
import { Dogs } from '../Common/Dogs'

export class CabinetScreen extends React.Component {
  state = {
    open: false
  };

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
      <View style={{flex : 1, justifyContent : 'center'}}>
        <TouchableOpacity
          style={{backgroundColor: '#ae9784', borderRadius: 10,
          alignItems: 'center', justifyContent: 'center',
          width : '80%', height: 50, marginTop: 10, marginLeft: '10%'}}
          onPress={() => this.setState({ open: true })}>
          <Text style={{fontFamily: 'SpoqaBold', fontSize: 15}}>글감</Text>
        </TouchableOpacity>
        
        <ScrollView>
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

        <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({ open: false })}
          style={{ alignItems: 'center', position: 'absolute' }}>
          <View>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Hello world!</Text>
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={() => this.setState({ offset: -100 })}>
              <Text>Move modal up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={() => this.setState({ offset: 0 })}>
              <Text>Reset modal position</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={() => this.setState({ open: true })}>
              <Text>Close modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
};