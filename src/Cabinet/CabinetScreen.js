import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { CabinetItem } from './CabinetItem';
import { IsValidKey } from '../Common/CommonMethod'
import { Dogs } from '../Common/Dogs'

export class CabinetScreen extends React.Component {
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
}
