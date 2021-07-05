import React from "react";
import { Text, TextInput, View, TouchableOpacity, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  WritingButtonImg,
  BaekguImg,
  JanggunImg,
  WuyuImg,
  YorkImg,
  CorgiImg,
  SilverImg,
} from "../../assets/ImageList";
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
      //1st Screen - id, pw Select
      /*
      <View style={[styles.SignInModal]}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <Image source={WritingButtonImg} style={{ height: 25, width: 25 }} />
          <View style={{flexDirection: 'column'}}>
          <Text style={{ fontFamily: "SpoqaBold", fontSize: 15 }}>
            새로운 작가님, 환영해요!
          </Text>
          <Text style={{ fontFamily: "SpoqaBold", fontSize: 10 }}>
            로그인에 쓰일 이메일, 비밀번호를 입력해주세요!
          </Text>
          </View>
          
        </View>
        <View style={{ height: "10%" }}></View>

        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 5 }}>
          <Text
            style={{ fontFamily: "SpoqaMedium", fontSize: 15, width: "30%" }}
          >
            이메일
          </Text>
          <TextInput
            placeholder="이메일 형식으로 입력해주세요!"
            placeholderTextColor="#FFFFFF"
            style={{
              fontSize: 12,
              backgroundColor: "#d4d4d4",
              borderRadius: 5,
              width: "60%",
              height: "100%",
              paddingLeft: 5,
            }}
          />
        </View>
        <View style={{ height: "10%" }}></View>

        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 5 }}>
          <Text
            style={{ fontFamily: "SpoqaMedium", fontSize: 15, width: "30%" }}
          >
            비밀번호
          </Text>
          <TextInput
            placeholder="8자 이상/문자,숫자,특수문자 포함"
            placeholderTextColor="#FFFFFF"
            style={{
              fontSize: 12,
              backgroundColor: "#d4d4d4",
              borderRadius: 5,
              width: "60%",
              height: "100%",
              paddingLeft: 5,
            }}
          />
        </View>
        <View style={{ height: "10%" }}></View>

        <View style={{ width: "100%", flexDirection: "row", paddingLeft: 5 }}>
          <Text
            style={{ fontFamily: "SpoqaMedium", fontSize: 15, width: "30%" }}
          >
            비밀번호 확인
          </Text>
          <TextInput
            placeholder="다시 입력해주세요!"
            placeholderTextColor="#FFFFFF"
            style={{
              fontSize: 12,
              backgroundColor: "#d4d4d4",
              borderRadius: 5,
              width: "60%",
              height: "100%",
              paddingLeft: 5,
            }}
          />
        </View>
        <View style={{ height: "10%" }}></View>

        <TouchableOpacity
          onPress={this.props.onSubmitButtonClicked}
          style={[styles.modalbutton]}
        >
          <View>
            <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}>
              {" "}
              다음!{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      */

      //2nd Screen - Dog Select
      <View style={[styles.SignInModal]}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <Image source={WritingButtonImg} style={{ height: 25, width: 25 }} />
          <Text style={{ fontFamily: "SpoqaBold", fontSize: 15 }}>
            당신을 표현할 강아지를 선택해주세요!
          </Text>
        </View>
        <View style={{ height: "10%" }}></View>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <ScrollView
            horizontal={false}
            style={{
              width: "65%",
              flexDirection: "column",
              backgroundColor: "#d4d4d4",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                padding: 5,
              }}
            >
              <TouchableOpacity onPress={() => this.onDogSelected(Dogs.Baekgu)}>
                <Image source={BaekguImg} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onDogSelected(Dogs.Janggun)}
              >
                <Image source={JanggunImg} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onDogSelected(Dogs.Wuyu)}>
                <Image source={WuyuImg} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onDogSelected(Dogs.York)}>
                <Image source={YorkImg} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onDogSelected(Dogs.Corgi)}>
                <Image source={CorgiImg} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onDogSelected(Dogs.Silver)}>
                <Image source={SilverImg} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
