import * as React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { IsValidKey } from "../Common/CommonMethod";
import { WritingButtonImg } from "../../assets/ImageList";
export class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoAuthScreen: false,
    };
  }

  deleteAccountInfo = async () => {
    AsyncStorage.removeItem("account_info");
    alert("로그아웃 되었습니다. ");
    this.setState({ gotoAuthScreen: true });
  };

  DeleteWritings = async () => {
    const keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < keys.length; i++) {
      if (!IsValidKey(keys[i])) {
        continue;
      }
      AsyncStorage.removeItem(keys[i]);
    }

    alert("작성한 글 들이 초기화 되었습니다.");
  };

  render() {
    if (this.state.gotoAuthScreen) {
      // TODO
    }

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: "90%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => this.deleteAccountInfo()}
        >
          <Image source={WritingButtonImg} style={{ width: 25, height: 25 }} />
          <Text style={{ marginLeft: 5, fontFamily: "SCBold", fontSize: 15 }}>
            로그아웃
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "90%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => this.DeleteWritings()}
        >
          <Image source={WritingButtonImg} style={{ width: 25, height: 25 }} />
          <Text style={{ marginLeft: 5, fontFamily: "SCBold", fontSize: 15 }}>
            작성한 글 초기화
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
