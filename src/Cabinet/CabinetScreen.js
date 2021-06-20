import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Styles';
import AsyncStorage from '@react-native-community/async-storage';
import { CabinetItem } from './CabinetItem';
import { IsValidKey, ParseSavedItem } from '../Common/CommonMethod'
import { Dogs } from '../Common/Dogs'

export class CabinetScreen extends React.Component {
  state = {
    visibleModal: null,
  };

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: true });
  }

  RenderCloseButton = (text, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.modalbutton]}>
      <View>
        <Text style={{ fontFamily: 'SpoqaBold', fontSize: 20 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  RenderWritingContent = () => (
    <View style={[styles.writingContentModal]}>
      <ScrollView>
        <TouchableOpacity
          style={{ height: 40 }}>
          <Text style={{ fontFamily: 'SpoqaMedium' }}>
            글감 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 40 }}>
          <Text style={{ fontFamily: 'SpoqaMedium' }}>
            글감 2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 40 }}>
          <Text style={{ fontFamily: 'SpoqaMedium' }}>
            글감 3
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 40 }}>
          <Text style={{ fontFamily: 'SpoqaMedium' }}>
            글감 4
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 40 }}>
          <Text style={{ fontFamily: 'SpoqaMedium' }}>
            글감 5
          </Text>
        </TouchableOpacity>

      </ScrollView>
      {this.RenderCloseButton('닫기', () => this.setState({ visibleModal: null }))}
    </View>
  );

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
      const parsedItem = ParseSavedItem(value);

      loadedData.push({
        time: parsedItem[0],
        subject: parsedItem[1],
        content: parsedItem[2]
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
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <ScrollView>
          {
            //<View>
            //  {this.RenderCloseButton('글감', () =>
            //    this.setState({ visibleModal: 1 })
            //  )}
            //</View>
          }
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

        {/* <Modal isVisible={this.state.visibleModal === 1}>
          {this.RenderWritingContent()}
        </Modal> */}

      </View>
    )
  }
};