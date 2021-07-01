import React from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import * as Font from "expo-font";
import { SignUpScreen } from "./SignUpScreen";
import { SignInScreen } from "./SignInScreen";
import MainScreen from "../Main/MainScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { LogoImg } from "../../assets/ImageList";
import UserInfo from "../Common/UserInfo";
import { styles } from "./Styles";

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
      }
    } catch (error) {
      console.error(error);
    }

    this.setState({ isLoading: false });
  };

  renderCloseButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress} style={[styles.modalbutton]}>
      <View>
        <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}> {text} </Text>
      </View>
    </TouchableOpacity>
  );

  renderSignIn() {
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

        {this.renderCloseButton("Submit", () =>
          this.setState({ visibleModal: null })
        )}
      </View>
    );
  }

  renderSignUp() {
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

        {this.renderCloseButton("가입", () =>
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

            {/* Sign Up */}
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ visibleModal: 2 })}
                style={[styles.modalbutton]}
              >
                <View>
                  <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}>
                    Sign Up (임시, 회원가입창 보여야함)
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Sign In 팝업 */}
            <Modal isVisible={this.state.visibleModal === 1}>
              {this.renderSignIn()}
            </Modal>
            {/* Sign Up 팝업 */}
            <Modal isVisible={this.state.visibleModal === 2}>
              {this.renderSignUp()}
            </Modal>
          </View>

          //<SignUpScreen signUp={true} GotoMainScreen={this.GotoMainScreen} />
        );
      }
    }
  }
}
