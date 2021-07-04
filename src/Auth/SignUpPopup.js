import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Dogs } from "../Common/Dogs";
import UserInfo from "../Common/UserInfo";
import { styles } from "./Styles";

export var SignUpState = {
  SetNickname: 1,
  SetDog: 2,
  ShowTutorial: 3,
};

let nickName = "";
let pw = "";
let comment = "";
export class SignUpPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpState: SignUpState.SetNickname,
      selectedDog: Dogs.Baekgu,
    };
  }

  OnNextButtonClicked() {
    switch (this.state.signUpState) {
      case SignUpState.SetNickname:
        this.setState({ signUpState: SignUpState.SetDog });
        break;
      case SignUpState.SetDog:
        AsyncStorage.setItem(
          "user_session",
          JSON.stringify({
            id: null,
            nickName: nickName,
            pw: pw,
            comment: comment,
            dog: this.state.selectedDog,
          })
        );

        let userInfo = UserInfo.get();
        userInfo.setNickName(nickName);
        userInfo.setComment(comment);
        userInfo.setDog(this.state.selectedDog);

        this.setState({ signUpState: SignUpState.ShowTutorial });
        break;
      case SignUpState.ShowTutorial:
        this.props.GotoMainScreen();
        break;
    }
  }

  onNicknameChange(text) {
    nickName = text;
  }

  onCommentChange(text) {
    comment = text;
  }

  onDogSelected(dog) {
    this.setState({ selectedDog: dog });
  }

  render() {
    return (
      <View style={[styles.SignInModal]}>
        <Text>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요!"
          placeholderTextColor="#FFFFFF"
          style={{
            fontSize: 12,
            backgroundColor: "#d4d4d4",
            borderRadius: 5,
            width: "60%",
            height: "23%",
            paddingLeft: 5,
          }}
        />
        <Text>비밀번호</Text>
        <TextInput
          placeholder="비밀번호를 입력해주세요!"
          placeholderTextColor="#FFFFFF"
          style={{
            fontSize: 12,
            backgroundColor: "#d4d4d4",
            borderRadius: 5,
            width: "60%",
            height: "23%",
            paddingLeft: 5,
          }}
        />

        <TouchableOpacity
          onPress={this.props.onSubmitButtonClicked}
          style={[styles.modalbutton]}
        >
          <View>
            <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}>
              {" "}
              Submit{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
