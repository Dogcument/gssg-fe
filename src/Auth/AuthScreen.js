import React from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import * as Font from "expo-font";
import { SignUpScreen } from "./SignUpScreen";
import { SignInScreen } from "./SignInScreen";
import MainScreen from "../Main/MainScreen";
import AsyncStorage from "@react-native-community/async-storage";
import UserInfo from "../Common/UserInfo";
import { styles } from "./Styles";
import {
  LogoImg,
  NextButtonImg,
  WritingButtonImg,
} from "../../assets/ImageList";

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
      //Modal state
      visibleModal: null,

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
      const session = await AsyncStorage.getItem("user_session");
      if (session != undefined) {
        this.state.hasSession = true;

        const saved = JSON.parse(session);
        let userInfo = UserInfo.get();
        userInfo.setNickName(saved.nickName);
        userInfo.setComment(saved.comment);
        userInfo.setDog(saved.dog);
      }
    } catch (error) {
      console.error(error);
    }

    this.setState({ isLoading: false });
  };

  RenderCloseButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress} style={[styles.modalbutton]}>
      <View>
        <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}> {text} </Text>
      </View>
    </TouchableOpacity>
  );
  RenderSignIn() {
    return (
      <View>
        <View style={[styles.SignInModal]}>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Image
              source={WritingButtonImg}
              style={{ height: 25, width: 25 }}
            />
            <Text style={{ fontFamily: "SpoqaBold", fontSize: 15 }}>
              글쑤시개에 오신 것을 환영합니다!
            </Text>
          </View>
          <View style={{ height: "10%" }}></View>

          <View style={{ width: "100%", flexDirection: "row", paddingLeft: 5 }}>
            <Text
              style={{ fontFamily: "SpoqaMedium", fontSize: 15, width: "30%" }}
            >
              이메일
            </Text>
            <TextInput
              placeholder="이메일을 입력해주세요!"
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
              placeholder="비밀번호를 입력해주세요!"
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

          <View style={{ width: '100%', flexDirection: 'row', justifyContent:'flex-end'}}>
            <Text>회원가입</Text>
            <Text>|</Text>
            <Text>비밀번호 찾기</Text>
          </View>
        </View>

        {this.RenderCloseButton("Log In", () =>
          this.setState({ visibleModal: null })
        )}
      </View>
    );
  }

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
        // TODO : Jiwung
        // Show SignInScreen
        //return <SignInScreen />;

        // Tempcode
        return (
          <View
            style={{ flexDirection: "column", width: "100%", height: "100%" }}
          >
            <ImageBackground
              source={LogoImg}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
            <View style={{ height: "70%" }} />
            <View>
              {this.RenderCloseButton("Sign In", () =>
                this.setState({ visibleModal: 1 })
              )}
            </View>

            <Modal isVisible={this.state.visibleModal === 1}>
              {this.RenderSignIn()}
            </Modal>
          </View>

          //<SignUpScreen signUp={true} GotoMainScreen={this.GotoMainScreen} />
        );
      }
    }
  }
}
