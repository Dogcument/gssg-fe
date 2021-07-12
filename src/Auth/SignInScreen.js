import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import { Modal } from "react-native-modal";
import { styles } from "./Styles";

export class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.SignInScreen]}>
        <Text style={{fontFamily: "SCBold"}}>아이디</Text>
        <TextInput
          placeholder="아이디를 입력해주세요!"
          placeholderTextColor="#FFFFFF"
          style={{
            fontSize: 12,
            backgroundColor: "#d4d4d4",
            borderRadius: 5,
            width: "80%",
            height: "30%",
            paddingLeft: 5,
            fontFamily: "SCThin"
          }}
        />
        <Text style={{fontFamily: "SCBold"}}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요!"
          placeholderTextColor="#FFFFFF"
          style={{
            fontSize: 12,
            backgroundColor: "#d4d4d4",
            borderRadius: 5,
            width: "80%",
            height: "30%",
            paddingLeft: 5,
            fontFamily: "SCThin"
          }}
        />
      </View>
    );
  }
}
