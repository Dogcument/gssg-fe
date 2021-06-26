import React from "react";
import { ImageBackground } from "react-native";
import * as Font from "expo-font";
import { SignUpScreen } from "./SignUpScreen";
import MainScreen from "../Main/MainScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { LogoImg } from "../../assets/ImageList";

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
      hasSession: false,

      // SignUp state
      signUpState: SignUpState.SetNickname,
    };
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      title: require("../../assets/fonts/BMEULJIROTTF.ttf"),
      SpoqaBold: require("../../assets/fonts/SpoqaHanSansNeo-Bold.ttf"),
      SpoqaMedium: require("../../assets/fonts/SpoqaHanSansNeo-Medium.ttf"),
      SpoqaRegular: require("../../assets/fonts/SpoqaHanSansNeo-Regular.ttf"),
    });

    this.retrieveUserSessionByAsyncStorage();
  };

  GotoMainScreen = (value) => {
    this.setState({ goMainScreen: true });
  };

  // TODO : Tempcode - should be migrated to EncryptedStorage
  retrieveUserSessionByAsyncStorage = async () => {
    try {
      // getItem "Key" should be "user_session"
      // value is json
      const session = await AsyncStorage.getItem("Nickname");
      if (session != undefined) {
        this.state.hasSession = true;
      }
    } catch (error) {
      console.error(error);
    }

    this.setState({ isLoading: false });
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
        <ImageBackground
          source={LogoImg}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      );
    } else {
      if (this.state.hasSession) {
        // TODO : Req login by session data
        // then goto MainScreen
        return <MainScreen />;
      } else {
        // TODO : Jiwung
        // Show SignInScreen
        //return <SignInScreen />;

        // Tempcode
        return (
          <SignUpScreen signUp={true} GotoMainScreen={this.GotoMainScreen} />
        );
      }
    }
  }
}
