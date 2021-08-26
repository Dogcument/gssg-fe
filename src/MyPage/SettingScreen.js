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
    AsyncStorage.removeItem("refresh_token");
    AsyncStorage.removeItem("jwt");

    alert("로그아웃 되었습니다. ");
    this.setState({ gotoAuthScreen: true });
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
        >
          <Image source={WritingButtonImg} style={{ width: 25, height: 25 }} />
          <Text style={{ marginLeft: 5, fontFamily: "SCBold", fontSize: 15 }}>
            계정 정보 변경
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "90%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={WritingButtonImg} style={{ width: 25, height: 25 }} />
          <Text style={{ marginLeft: 5, fontFamily: "SCBold", fontSize: 15 }}>
            고객센터
          </Text>
        </TouchableOpacity>

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
      </View>
    );
  }
}
