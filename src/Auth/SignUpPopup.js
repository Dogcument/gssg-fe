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
import { WritingButtonImg } from "../../assets/ImageList";
import { Dogs, DogImages, ServerDogs } from "../Common/Dogs";
import UserInfo from "../Common/UserInfo";
import { TutorialScreen } from "./TutorialScreen";
import { validateEmail, validatePassword } from "../Common/CommonMethod";
import { callApi } from "../Common/ApiHelper";

export var SignUpState = {
  SetEmailPw: 1,
  SetDog: 2,
  SetNicknameComment: 3,
  ShowTutorial: 4,
};

let email = "";
let pw = "";
let pwCheck = "";
let nickname = "";
let comment = "";
let isOverllapedEmail = false;
export class SignUpPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpState: SignUpState.SetEmailPw,
      selectedDog: 0,
    };
  }

  OnNextButtonClicked() {
    switch (this.state.signUpState) {
      case SignUpState.SetEmailPw:
        if (isOverllapedEmail) {
          alert("이미 존재하는 이메일 입니다.");
          return;
        }

        if (!validateEmail(email)) {
          alert("이메일 형식이 옳지 않아요!");
          return;
        }

        if (pw == "") {
          alert("비밀번호가 없어요!");
          return;
        }

        const isValidPw = validatePassword(pw, {
          length: [8, Infinity],
          lower: 1,
          upper: 0,
          numeric: 1,
          special: 1,
          badWords: ["password"],
          badSequenceLength: 4,
        });

        if (!isValidPw) {
          alert("비밀번호가 형식에 맞지 않아요!");
          return;
        }

        if (pw != pwCheck) {
          alert("비밀번호를 똑같이 입력해주세요!");
          return;
        }
        this.onIdPwDone();
        break;
      case SignUpState.SetDog:
        this.setState({ signUpState: SignUpState.SetNicknameComment });
        break;
      case SignUpState.SetNicknameComment:
        this.reqSignUp();
        break;
    }
  }

  reqSignUp = async () => {
    const resp = await callApi(
      "members",
      "POST",
      JSON.stringify({
        email: email,
        password: pw,
        nickname: nickname,
        profileDogType: ServerDogs[this.state.selectedDog],
        introduce: comment,
      })
    );

    if (resp == null) {
      return;
    }

    this.onSignUpSuccess();
  };

  onIdPwDone() {
    this.setState({ signUpState: SignUpState.SetDog });
  }

  reqSignIn = async () => {
    let result = await callApi(
      "auth/login",
      "POST",
      JSON.stringify({
        loginId: email,
        password: pw,
      })
    );

    if (result == null) {
      return;
    }
    this.onSignInSuccess(result);
  };

  onSignUpSuccess() {
    this.reqSignIn();
  }

  onSignInSuccess(json) {
    let userInfo = UserInfo.instance;
    userInfo.setRefreshToken(json.refreshToken);
    userInfo.setJwt(json.jwt);
    userInfo.setNickname(nickname);
    this.setState({ signUpState: SignUpState.ShowTutorial });
  }

  onNicknameChange(text) {
    nickname = text;
  }

  onCommentChange(text) {
    comment = text;
  }

  onDogSelected(dog) {
    this.setState({ selectedDog: dog });
  }

  onEmailTextChanged(inputText) {
    email = inputText;
  }

  onPwTextChanged(inputText) {
    pw = inputText;
  }

  onPwCheckTextChanged(inputText) {
    pwCheck = inputText;
  }

  onEndEmailEditing = async () => {
    if (!validateEmail(email)) {
      alert("이메일 형식이 옳지 않아요!");
      return;
    }

    const resp = await callApi(
      "members/email/exists?email=" + email,
      "GET",
      null
    );

    if (resp == null) {
      return;
    }

    if (resp == true) {
      isOverllapedEmail = true;
      alert("이미 존재하는 이메일 입니다.");
    } else {
      isOverllapedEmail = false;
      console.log("New Eamil");
      return;
    }
  };

  onEndPwEditing() {
    const isValidPw = validatePassword(pw, {
      length: [8, Infinity],
      lower: 1,
      upper: 0,
      numeric: 1,
      special: 1,
      badWords: ["password"],
      badSequenceLength: 4,
    });

    if (!isValidPw) {
      alert("비밀번호가 형식에 맞지 않아요!");
      return;
    }
  }

  onEndPwCheckEditing() {
    if (pw != pwCheck) {
      alert("비밀번호가 다릅니다!");
      return;
    }
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
                  fontFamily: "SCBold",
                  fontSize: 17.5,
                  paddingTop: 2.5,
                }}
              >
                새로운 작가님, 환영해요!
              </Text>
              <Text style={{ fontFamily: "SCBold", fontSize: 12.5 }}>
                로그인에 쓰일 이메일, 비밀번호를 입력해주세요!
              </Text>
            </View>
          </View>
          <View style={{ height: "10%" }}></View>

          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={{ fontFamily: "SCThin", fontSize: 15, flex: 3 }}>
              이메일
            </Text>
            <TextInput
              placeholder="이메일 형식으로 입력해주세요!"
              placeholderTextColor="#FFFFFF"
              style={{
                fontSize: 12,
                fontFamily: "SCThin",
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                flex: 7,
                height: "100%",
                paddingLeft: 5,
              }}
              onChangeText={(inputText) => this.onEmailTextChanged(inputText)}
              onBlur={() => this.onEndEmailEditing()}
            />
          </View>
          <View style={{ height: "10%" }}></View>

          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={{ fontFamily: "SCThin", fontSize: 15, flex: 3 }}>
              비밀번호
            </Text>
            <TextInput
              placeholder="8자 이상/문자,숫자,특수문자 포함"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              style={{
                fontSize: 12,
                fontFamily: "SCThin",
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                flex: 7,
                height: "100%",
                paddingLeft: 5,
              }}
              onChangeText={(inputText) => this.onPwTextChanged(inputText)}
              onBlur={() => this.onEndPwEditing()}
            />
          </View>
          <View style={{ height: "10%" }}></View>

          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={{ fontFamily: "SCThin", fontSize: 15, flex: 3 }}>
              비밀번호확인
            </Text>
            <TextInput
              placeholder="다시 입력해주세요!"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              style={{
                fontSize: 12,
                fontFamily: "SCThin",
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                flex: 7,
                height: "100%",
                paddingLeft: 5,
              }}
              onChangeText={(inputText) => this.onPwCheckTextChanged(inputText)}
              onBlur={() => this.onEndPwCheckEditing()}
            />
          </View>
        </View>
        <View style={{ height: "2.5%" }}></View>

        <TouchableOpacity
          onPress={() => this.OnNextButtonClicked()}
          style={{
            height: 30,
            marginLeft: "40%",
            width: "20%",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            shadowColor: "#000000",
            shadowOpacity: 0.7,
            shadowOffset: {
              height: 7.5,
              width: 7.5,
            },
            shadowRadius: 25,
          }}
        >
          <View>
            <Text style={{ fontFamily: "SCThin", fontSize: 15 }}> 다음! </Text>
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
                fontFamily: "SCBold",
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
                {Dogs.map((_value, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.onDogSelected(index)}
                  >
                    <Image
                      source={DogImages[index]}
                      style={{ width: 50, height: 50 }}
                    />
                  </TouchableOpacity>
                ))}
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
              <Text style={{ fontFamily: "SCBold", fontSize: 15 }}>
                {" "}
                {Dogs[this.state.selectedDog]}{" "}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ height: "2.5%" }}></View>

        <TouchableOpacity
          onPress={() => this.OnNextButtonClicked()}
          style={{
            height: 30,
            marginLeft: "40%",
            width: "20%",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            shadowColor: "#000000",
            shadowOpacity: 0.7,
            shadowOffset: {
              height: 7.5,
              width: 7.5,
            },
            shadowRadius: 25,
          }}
        >
          <View>
            <Text style={{ fontFamily: "SCThin", fontSize: 15 }}> 다음! </Text>
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
                fontFamily: "SCBold",
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
            <Text style={{ fontFamily: "SCThin", fontSize: 15, width: "30%" }}>
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
              onChangeText={(inputText) => this.onNicknameChange(inputText)}
            />
            <View></View>
            <Text style={{ fontFamily: "SCThin", fontSize: 15, width: "30%" }}>
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
              onChangeText={(inputText) => this.onCommentChange(inputText)}
            />
          </View>
        </View>
        <View style={{ height: "2.5%" }}></View>

        <TouchableOpacity
          onPress={() => this.OnNextButtonClicked()}
          style={{
            height: 30,
            marginLeft: "40%",
            width: "20%",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
            shadowColor: "#000000",
            shadowOpacity: 0.7,
            shadowOffset: {
              height: 7.5,
              width: 7.5,
            },
            shadowRadius: 25,
          }}
        >
          <View>
            <Text style={{ fontFamily: "SCThin", fontSize: 15 }}> 완료! </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  renderTutorial() {
    return <TutorialScreen GotoMainScreen={this.props.gotoMainScreen} />;
  }

  render() {
    switch (this.state.signUpState) {
      case SignUpState.SetEmailPw:
        return this.renderSetEmailPw();
      case SignUpState.SetDog:
        return this.renderSetDog();
      case SignUpState.SetNicknameComment:
        return this.renderSetNickNameComment();
      case SignUpState.ShowTutorial:
        return this.renderTutorial();
    }
  }
}
