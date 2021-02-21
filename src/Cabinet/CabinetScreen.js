import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { CabinetItem } from './CabinetItem';

export class CabinetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      data: 0
    }
    this.LoadData();
  }

  LoadData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    let loadedData = [];
    for (let i = 0; i < keys.length; i++) {
      const value = await AsyncStorage.getItem(keys[i]);
      loadedData.push({
        time: keys[i],
        content: value
      });
    }

    this.setState({
      isLoad: true,
      data: { loadedData }
    }, () => alert("All loaded"))
  }

  render() {
    if (!this.state.isLoad) {
      return (
        <ScrollView></ScrollView>
      )
    }

    console.log("Rendering after loaded");
    const ItemList = this.state.data.loadedData;
    return (
      <ScrollView>
        {
          ItemList.map((value) => 
            <CabinetItem key={value.time} writingTime={value.time} content={value.content} />)
        }
      </ScrollView>
    )
  }
}
