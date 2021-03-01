import * as React from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { MyPageProfile } from './MyPageProfile';
import { MyPageItem } from './MyPageItem';

export class MyPageScreen extends React.Component {
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
    });
  }

  render() {
    if (!this.state.isLoad) {
      return (
        <ScrollView></ScrollView>
      )
    }

    console.log("Rendering after loaded");
    const ItemList = this.state.data.loadedData;
    const navigation = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        { /* Fixed Line */}
        <View>
          <MyPageProfile></MyPageProfile>
        </View>
        { /* Fixed Line */}
        <ScrollView>
          {
            ItemList.map((value) =>
              <MyPageItem
                key={value.time}
                navigation={navigation}
                writingTime={value.time}
                content={value.content} />)
          }
        </ScrollView>
      </View>
    );
  }
}

export default MyPageScreen; 
