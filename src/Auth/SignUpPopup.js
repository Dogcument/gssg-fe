import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
import { Dogs, DogImages } from "../Common/Dogs";
import UserInfo from "../Common/UserInfo";
import { styles } from "./Styles";

export var SignUpState = {
  SetEmailPw: 1,
  SetDog: 2,
  SetNicknameComment: 3,
};

let email = "";
let pw = "";
let nickName = "";
let comment = "";
export class SignUpPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpState: SignUpState.SetEmailPw,
      selectedDog: Dogs.Baekgu,
    };
  }

  OnNextButtonClicked() {
    switch (this.state.signUpState) {
      case SignUpState.SetEmailPw:
        this.setState({ signUpState: SignUpState.SetDog });
        break;
      case SignUpState.SetDog:
        this.setState({ signUpState: SignUpState.SetNicknameComment });
        break;
      case SignUpState.SetNicknameComment:
        AsyncStorage.setItem(
          "user_session",
          JSON.stringify({
            email: email,
            pw: pw,
            dog: this.state.selectedDog,
            nickName: nickName,
            comment: comment,
          })
        );

        let userInfo = UserInfo.get();
        userInfo.setNickName(nickName);
        userInfo.setComment(comment);
        userInfo.setDog(this.state.selectedDog);
        this.props.gotoMainScreen();
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

  /* Rendering Functions */
  renderSetEmailPw() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "web" ? "height" : "position"}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={[styles.SignUpModal]}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Image
              source={WritingButtonImg}
              style={{ height: 25, width: 25, marginRight: 2.5 }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontFamily: "SpoqaBold",
                  fontSize: 17.5,
                  paddingTop: 2.5,
                }}
              >
                새로운 작가님, 환영해요!
              </Text>
              <Text style={{ fontFamily: "SpoqaBold", fontSize: 12.5 }}>
                로그인에 쓰일 이메일, 비밀번호를 입력해주세요!
              </Text>
            </View>
          </View>
          <View style={{ height: "10%" }}></View>

          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15, flex: 3 }}>
              이메일
            </Text>
            <TextInput
              placeholder="이메일 형식으로 입력해주세요!"
              placeholderTextColor="#FFFFFF"
              style={{
                fontSize: 12,
                fontFamily: "SpoqaMedium",
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                flex: 7,
                height: "100%",
                paddingLeft: 5,
              }}
            />
          </View>
          <View style={{ height: "10%" }}></View>

          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15, flex: 3 }}>
              비밀번호
            </Text>
            <TextInput
              placeholder="8자 이상/문자,숫자,특수문자 포함"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              style={{
                fontSize: 12,
                fontFamily: "SpoqaMedium",
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                flex: 7,
                height: "100%",
                paddingLeft: 5,
              }}
            />
          </View>
          <View style={{ height: "10%" }}></View>

          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15, flex: 3 }}>
              비밀번호확인
            </Text>
            <TextInput
              placeholder="다시 입력해주세요!"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              style={{
                fontSize: 12,
                fontFamily: "SpoqaMedium",
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                flex: 7,
                height: "100%",
                paddingLeft: 5,
              }}
            />
          </View>
        </View>
        <View style={{ height: "2.5%" }}></View>

        <TouchableOpacity
          onPress={() => this.OnNextButtonClicked()}
          style={[styles.ModalButton]}
        >
          <View>
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15 }}>
              {" "}
              다음!{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  renderSetDog() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <View style={[styles.SignUpModal]}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Image
              source={WritingButtonImg}
              style={{ height: 25, width: 25, marginRight: 2.5 }}
            />
            <Text
              style={{
                fontFamily: "SpoqaBold",
                fontSize: 17.5,
                paddingTop: 2.5,
              }}
            >
              당신을 표현할 강아지를 선택하세요!
            </Text>
          </View>
          <View style={{ height: "10%" }}></View>

          <View style={{ width: "100%", height: "75%", flexDirection: "row" }}>
            <ScrollView
              horizontal={false}
              style={{
                width: "35%",
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
                <TouchableOpacity
                  onPress={() => this.onDogSelected(Dogs.Baekgu)}
                >
                  <Image source={BaekguImg} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onDogSelected(Dogs.Janggun)}
                >
                  <Image
                    source={JanggunImg}
                    style={{ width: 50, height: 50 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onDogSelected(Dogs.Wuyu)}>
                  <Image source={WuyuImg} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onDogSelected(Dogs.York)}>
                  <Image source={YorkImg} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onDogSelected(Dogs.Corgi)}
                >
                  <Image source={CorgiImg} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onDogSelected(Dogs.Silver)}
                >
                  <Image source={SilverImg} style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: -15,
              }}
            >
              <Image
                source={DogImages[this.state.selectedDog]}
                style={{ width: 90, height: 90 }}
              />
              <Text style={{ fontFamily: "SpoqaBold", fontSize: 15 }}>
                {" "}
                {this.state.selectedDog}{" "}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: "2.5%" }}></View>

        <TouchableOpacity
          onPress={() => this.OnNextButtonClicked()}
          style={[styles.ModalButton]}
        >
          <View>
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15 }}>
              {" "}
              다음!{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderSetNickNameComment() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "web" ? "height" : "position"}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={[styles.SignUpModal]}>
          <Image
            source={DogImages[this.state.selectedDog]}
            style={{
              marginLeft: "55%",
              width: 120,
              height: 120,
              position: "absolute",
            }}
          />
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Image
              source={WritingButtonImg}
              style={{ height: 25, width: 25, marginRight: 2.5 }}
            />
            <Text
              style={{
                fontFamily: "SpoqaBold",
                fontSize: 17.5,
                paddingTop: 2.5,
              }}
            >
              작가등록증
            </Text>
          </View>
          <View style={{ height: "10%" }}></View>

          <View
            style={{
              width: "100%",
              height: "70%",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{ fontFamily: "SpoqaMedium", fontSize: 15, width: "30%" }}
            >
              필명
            </Text>
            <TextInput
              placeholder="특수문자는 불가능해요!"
              placeholderTextColor="#FFFFFF"
              style={{
                fontSize: 12,
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                width: "60%",
                height: "20%",
                paddingLeft: 5,
              }}
            />
            <View></View>
            <Text
              style={{ fontFamily: "SpoqaMedium", fontSize: 15, width: "30%" }}
            >
              한 줄 소개
            </Text>
            <TextInput
              placeholder="자신을 자유롭게 소개해주세요!"
              placeholderTextColor="#FFFFFF"
              style={{
                fontSize: 12,
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                width: "100%",
                height: "20%",
                paddingLeft: 5,
              }}
            />
          </View>
        </View>
        <View style={{ height: "2.5%" }}></View>

        <TouchableOpacity
          onPress={() => this.OnNextButtonClicked()}
          style={[styles.ModalButton]}
        >
          <View>
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15 }}>
              {" "}
              완료!{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  render() {
    switch (this.state.signUpState) {
      case SignUpState.SetEmailPw:
        return this.renderSetEmailPw();
      case SignUpState.SetDog:
        return this.renderSetDog();
      case SignUpState.SetNicknameComment:
        return this.renderSetNickNameComment();
    }
  }
}
