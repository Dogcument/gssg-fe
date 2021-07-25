import React from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import * as Font from "expo-font";
import { SignUpPopup } from "./SignUpPopup";
import { SignInPopup } from "./SignInPopup";
import MainScreen from "../Main/MainScreen";
import { styles } from "./Styles";
import { LogoImg } from "../../assets/ImageList";
import { getAccountInfoFromStorage } from "../Common/StorageHelper";

export const SignUpState = {
  SetNickname: 1,
  SetDog: 2,
  ShowTutorial: 3,
};

let accountInfo = null;
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

  gotoMainScreen = () => {
    this.setState({ goMainScreen: true });
  };

  // TODO : Tempcode - should be migrated to EncryptedStorage
  retrieveUserSessionByAsyncStorage = async () => {
    accountInfo = getAccountInfoFromStorage();
    if (accountInfo != null) {
      this.state.hasSession = true;
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

  // TODO : EncryptedStorage does not support expo :(
  // retrieveUserSession = async () => {
  //   try {
  //     const session = await EncryptedStorage.getItem("user_info");
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

            {/* Sign In 팝업 */}
            <Modal isVisible={this.state.visibleModal === 1}>
              <SignInPopup gotoMainScreen={this.gotoMainScreen} onSignUpButtonClicked={this.onSignUpButtonClicked} />
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
