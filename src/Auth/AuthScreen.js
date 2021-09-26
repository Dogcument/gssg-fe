import React from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import * as Font from "expo-font";
import { SignUpPopup } from "./SignUpPopup";
import { SignInPopup } from "./SignInPopup";
import MainScreen from "../Main/MainScreen";
import { styles } from "./Styles";
import { LogoImg } from "../../assets/ImageList";
import UserInfo from "../Common/UserInfo";
import { callApiToken } from "../Common/ApiHelper";
import AsyncStorage from "@react-native-community/async-storage";

export const SignUpState = {
  SetNickname: 1,
  SetDog: 2,
  ShowTutorial: 3,
};

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goMainScreen: false,
      isLoading: true,
      loadInfoSuccess: false,
      visibleModal: null,
      signUpState: SignUpState.SetNickname,
    };
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      Ridi: require("../../assets/fonts/RIDIBatang.otf"),
      SCBold: require("../../assets/fonts/SCDreamBold.otf"),
      SCThin: require("../../assets/fonts/SCDreamThin.otf"),
    });

    await UserInfo.init();
    this.tryLoadInfo();
  };

  gotoMainScreen = () => {
    this.setState({ goMainScreen: true });
  };

  reqLoadInfo = async (userInfo) => {
    const resp = await callApiToken("my", "GET", userInfo.getJwt(), null);

    if (resp == null) {
      return;
    } else if (resp == false) {
      AsyncStorage.removeItem("refresh_token");
      AsyncStorage.removeItem("jwt");
      return;
    }

    this.onLoadInfoSuccess(resp);
  };

  onLoadInfoSuccess(resp) {
    let userInfo = UserInfo.instance;
    userInfo.setNickName(resp.nickName);
    userInfo.setComment(resp.introduce);
    userInfo.setDog(resp.profileDog);

    this.state.loadInfoSuccess = true;
  }

  tryLoadInfo = async () => {
    const userInfo = UserInfo.instance;
    const jwt = userInfo.getJwt();
    if (jwt != null) {
      this.reqLoadInfo(userInfo);
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
        <Text style={{ fontFamily: "SCBold", fontSize: 20 }}> {text} </Text>
      </View>
    </TouchableOpacity>
  );

  onSignUpButtonClicked = () => {
    this.setState({ visibleModal: 2 });
  };

  openFindPwPopup() {
    alert("비밀번호 찾기 기능은 개발중입니다.");
  }

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
      if (this.state.loadInfoSuccess) {
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

            {/* Sign In 팝업 */}
            <Modal isVisible={this.state.visibleModal === 1}>
              <SignInPopup
                gotoMainScreen={this.gotoMainScreen}
                onSignUpButtonClicked={this.onSignUpButtonClicked}
              />
            </Modal>
            {/* Sign Up 팝업 */}
            <Modal isVisible={this.state.visibleModal === 2}>
              <SignUpPopup gotoMainScreen={this.gotoMainScreen} />
            </Modal>
          </View>
        );
      }
    }
  }
}
