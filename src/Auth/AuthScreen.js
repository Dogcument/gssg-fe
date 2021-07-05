import React from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import * as Font from "expo-font";
import { SignUpPopup } from "./SignUpPopup";
import { SignInPopup } from "./SignInPopup";
import MainScreen from "../Main/MainScreen";
import AsyncStorage from "@react-native-community/async-storage";
import UserInfo from "../Common/UserInfo";
import { styles } from "./Styles";
import { LogoImg } from "../../assets/ImageList";

export const SignUpState = {
  SetNickname: 1,
  SetDog: 2,
  ShowTutorial: 3,
};

var email = "";
var pw = "";

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goMainScreen: false,
      isLoading: true,
      hasSession: false,
      //Modal state
      visibleModal: null,

      // SignUp state
      signUpState: SignUpState.SetNickname,
    };
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      Ridi: require("../../assets/fonts/RIDIBatang.otf"),
      SCBold: require("../../assets/fonts/SCDreamBold.otf"),
      SCThin: require("../../assets/fonts/SCDreamThin.otf"),
    });

    this.retrieveUserSessionByAsyncStorage();
  };

  gotoMainScreen = (value) => {
    this.setState({ goMainScreen: true });
  };

  // TODO : Tempcode - should be migrated to EncryptedStorage
  retrieveUserSessionByAsyncStorage = async () => {
    try {
      const session = await AsyncStorage.getItem("user_session");
      if (session != undefined) {
        this.state.hasSession = true;

        const saved = JSON.parse(session);
        let userInfo = UserInfo.get();
        userInfo.setNickName(saved.nickName);
        userInfo.setComment(saved.comment);
        userInfo.setDog(saved.dog);
      } else {
        console.log("Has no session");
      }
    } catch (error) {
      console.error(error);
    }

    setTimeout(this.onRetrieveUserSessionDone, 1500);
  };

  onRetrieveUserSessionDone = () => {
    this.state.visibleModal = 1;
    this.setState({ isLoading: false });
  };

  onSubmitButtonClicked = () => {
    this.setState({ visibleModal: null });
  };

  renderCloseButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress} style={[styles.modalbutton]}>
      <View>
        <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}> {text} </Text>
      </View>
    </TouchableOpacity>
  );

  onLoginButtonClicked = async () => {
    if (email == "") {
      alert("이메일을 입력해주세요!");
      return;
    }

    if (pw == "") {
      alert("비밀번호를 입력해주세요!");
      return;
    }

    try {
      let resp = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId: email,
          password: pw,
        }),
      });
      if (resp != undefined) {
        let json = await resp.json();
        console.log(json);
      } else {
        console.error("resp is null");
      }
    } catch (err) {
      console.error(err);
      this.setState({ visibleModal: null });
    }
  };

  onSignUpButtonClicked = () => {
    this.setState({ visibleModal: 2 });
  };

  openFindPwPopup() {
    alert("비밀번호 찾기 기능은 개발중입니다.");
  }

  onEmailTextChanged = (value) => {
    email = value;
  };

  onPwTextChanged = (value) => {
    pw = value;
  };

  // TODO : EncryptedStorage does not support expo :(
  // retrieveUserSession = async () => {
  //   try {
  //     const session = await EncryptedStorage.getItem("user_session");
  //     if (session == undefined) {
  //       console.error("로그인 정보가 없음");
  //       this.state.isNewbie = true;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setTimeout(() => {
  //     this.setState({ isLoading: false });
  //   }, 3000);
  // };

  render() {
    if (this.state.goMainScreen) {
      return <MainScreen />;
    }

    if (this.state.isLoading) {
      return (
        <View style={{ flexDirection: "row", width: "100%", height: "100%" }}>
          <ImageBackground
            source={LogoImg}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </View>
      );
    } else {
      if (this.state.hasSession) {
        // TODO : Req login by session data
        // then goto MainScreen
        return <MainScreen />;
      } else {
        return (
          <View
            style={{ flexDirection: "column", width: "100%", height: "100%" }}
          >
            <ImageBackground
              source={LogoImg}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
            <View style={{ height: "70%" }} />

            {/* Sign In */}
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ visibleModal: 1 })}
                style={[styles.modalbutton]}
              >
                <View>
                  <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}>
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Sign In 팝업 */}
            <Modal isVisible={this.state.visibleModal === 1}>
              <SignInPopup
                onLoginButtonClicked={this.onLoginButtonClicked}
                onSignUpButtonClicked={this.onSignUpButtonClicked}
                onEmailTextChanged={this.onEmailTextChanged}
                onPwTextChanged={this.onPwTextChanged}
              />
            </Modal>
            {/* Sign Up 팝업 */}
            <Modal isVisible={this.state.visibleModal === 2}>
              <SignUpPopup onSubmitButtonClicked={this.onSubmitButtonClicked} />
            </Modal>
          </View>
        );
      }
    }
  }
}
