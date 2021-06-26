import * as React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { IsValidKey } from "../Common/CommonMethod";
import { WritingButtonImg } from "../../assets/ImageList";
export class SettingScreen extends React.Component {
  deleteUserInfo = async () => {
    AsyncStorage.removeItem("user_session");
    alert("유저 정보가 삭제 되었습니다.");
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
          onPress={() => this.deleteUserInfo()}
        >
          <Image source={WritingButtonImg} style={{ width: 25, height: 25 }} />
          <Text
            style={{ marginLeft: 5, fontFamily: "SpoqaBold", fontSize: 15 }}
          >
            프로필 초기화
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
          <Text
            style={{ marginLeft: 5, fontFamily: "SpoqaBold", fontSize: 15 }}
          >
            작성한 글 초기화
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
