import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./Styles";
import AsyncStorage from "@react-native-community/async-storage";
import { CabinetItem } from "./CabinetItem";
import { IsValidKey, ParseSavedItem } from "../Common/CommonMethod";
import UserInfo from "../Common/UserInfo";
import { ProtoWritings } from "../Common/ProtoWritings";
import { sub } from "react-native-reanimated";

export class CabinetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      data: 0,
      visibleModal: null,
      subject: ProtoWritings[0],
    };
    this.LoadData();
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: true });
  }

  RenderCloseButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress} style={[styles.modalbutton]}>
      <View>
        <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  RenderWritingContent() {
    return (
      <View style={[styles.writingContentModal]}>
        <ScrollView>
          {ProtoWritings.map((value) => (
            <TouchableOpacity
              key={value}
              style={{ height: 40 }}
              onPress={() => this.onWritingSubjectClicked(value)}
            >
              <Text style={{ fontFamily: "SpoqaMedium" }}>{value}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {this.RenderCloseButton("닫기", () =>
          this.setState({ visibleModal: null })
        )}
      </View>
    );
  }

  onWritingSubjectClicked(subject) {
    console.log(subject);
    this.state.subject = subject;
    this.setState({ visibleModal: subject });
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

    this.setState({
      isLoad: true,
      data: { loadedData },
    });
  };

  showWritings(value, userInfo, navigation) {
    if (value.subject != this.state.subject) {
      return;
    }

    return (
      <CabinetItem
        selectedDog={userInfo.getDog()}
        key={value.time}
        navigation={navigation}
        writingTime={value.time}
        content={value.content}
      />
    );
  }

  render() {
    if (!this.state.isLoad) {
      return <ScrollView></ScrollView>;
    }

    const ItemList = this.state.data.loadedData;
    const navigation = this.props.navigation;
    const userInfo = UserInfo.get();

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView>
          {
            <View>
              {this.RenderCloseButton(this.state.subject, () =>
                this.setState({ visibleModal: 1 })
              )}
            </View>
          }
          {ItemList.map((value) => this.showWritings(value, userInfo, navigation))}
        </ScrollView>

        <Modal isVisible={this.state.visibleModal === 1}>
          {this.RenderWritingContent()}
        </Modal>
      </View>
    );
  }
}
