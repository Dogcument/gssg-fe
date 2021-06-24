import * as React from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { MyPageProfile } from "./MyPageProfile";
import { MyPageItem } from "./MyPageItem";
import { IsValidKey, ParseSavedItem } from "../Common/CommonMethod";
import { Dogs } from "../Common/Dogs";
export class MyPageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      data: 0,
      selectedDog: Dogs.Baekgu,
    };
    this.LoadData();
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: true });
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
      const parsedItem = ParseSavedItem(value);

      loadedData.push({
        time: parsedItem[0],
        subject: parsedItem[1],
        content: parsedItem[2],
      });
    }

    const selectedDog = await AsyncStorage.getItem("SelectedDog");
    this.state.selectedDog = selectedDog;

    this.setState({
      isLoad: true,
      data: { loadedData },
    });
  };

  render() {
    if (!this.state.isLoad) {
      return <ScrollView></ScrollView>;
    }

    const ItemList = this.state.data.loadedData;
    const navigation = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        {/* Fixed Line */}
        <View>
          <MyPageProfile
            selectedDog={this.state.selectedDog}
            writingNum={ItemList.length}
          />
        </View>
        {/* Fixed Line */}
        <ScrollView>
          {ItemList.map((value) => (
            <MyPageItem
              selectedDog={this.state.selectedDog}
              key={value.time}
              navigation={navigation}
              subject={value.subject}
              writingTime={value.time}
              content={value.content}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
