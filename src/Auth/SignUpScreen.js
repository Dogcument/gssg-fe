import React from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { TutorialScreen } from "./TutorialScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { Dogs, DogImages } from "../Common/Dogs";
import {
  LogoImg,
  NextButtonImg,
  WritingButtonImg,
} from "../../assets/ImageList";
import UserInfo from "../Common/UserInfo";

export var SignUpState = {
  SetNickname: 1,
  SetDog: 2,
  ShowTutorial: 3,
};

let nickName = "";
let pw = "";
let comment = "";
export class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpState: SignUpState.SetNickname,
      selectedDogIndex: 0,
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
            dog: this.state.selectedDogIndex,
          })
        );

        let userInfo = UserInfo.get();
        userInfo.setNickName(nickName);
        userInfo.setComment(comment);
        userInfo.setDog(this.state.selectedDogIndex);

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
    this.setState({ selectedDogIndex: dog });
  }

  render() {
    if (this.props.signUp) {
      switch (this.state.signUpState) {
        case SignUpState.SetNickname:
          return (
            <KeyboardAvoidingView
              behavior={Platform.OS === "web" ? "height" : "position"}
              style={{ width: "100%", height: "100%" }}
            >
              <ImageBackground
                source={LogoImg}
                style={{ position: "absolute", width: "100%", height: "100%" }}
              />
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000000",
                  opacity: 0.5,
                }}
              />
              <View style={styles.modalBackground}>
                <View style={{ margin: 15, flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={WritingButtonImg}
                      style={{ height: 25, width: 25 }}
                    />
                    <Text
                      style={{
                        flex: 1,
                        fontFamily: "SCBold",
                        fontSize: 20,
                        marginLeft: 10,
                      }}
                    >
                      작가 등록증
                    </Text>
                    <TouchableHighlight
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => this.OnNextButtonClicked()}
                    >
                      <Image
                        style={{ width: 25, height: 25 }}
                        source={NextButtonImg}
                      />
                    </TouchableHighlight>
                  </View>

                  <View
                    style={{
                      flex: 4,
                      flexDirection: "column",
                      justifyContent: "space-around",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontFamily: "SCBold" }}>필명</Text>
                    <TextInput
                      placeholder="필명을 입력해주세요!"
                      placeholderTextColor="#FFFFFF"
                      style={{
                        fontFamily: "SCBold",
                        fontSize: 12,
                        backgroundColor: "#d4d4d4",
                        borderRadius: 5,
                        width: "60%",
                        height: "23%",
                        paddingLeft: 5,
                      }}
                      onChangeText={(text) => this.onNicknameChange(text)}
                    />
                    <View style={{ height: 5 }}></View>
                    <Text style={{ fontFamily: "SCBold" }}>한 줄 소개</Text>
                    <TextInput
                      placeholder="간단한 설명을 해주세요!"
                      placeholderTextColor="#FFFFFF"
                      style={{
                        fontFamily: "SCBold",
                        fontSize: 12,
                        backgroundColor: "#d4d4d4",
                        borderRadius: 5,
                        width: "100%",
                        height: "23%",
                        paddingLeft: 5,
                      }}
                      onChangeText={(text) => this.onCommentChange(text)}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          );
        case SignUpState.SetDog:
          return (
            <View style={{ width: "100%", height: "100%" }}>
              <ImageBackground
                source={LogoImg}
                style={{ position: "absolute", width: "100%", height: "100%" }}
              />
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000000",
                  opacity: 0.5,
                }}
              />
              <View style={styles.modalBackground}>
                <View style={{ margin: 15, flex: 1, flexDirection: "row" }}>
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

                  <View style={{ flexDirection: "column", width: "35%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginLeft: 20,
                        marginBottom: 20,
                      }}
                    >
                      <TouchableHighlight
                        onPress={() => this.OnNextButtonClicked()}
                      >
                        <Image
                          style={{ width: 25, height: 25 }}
                          source={NextButtonImg}
                        />
                      </TouchableHighlight>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop: -15,
                      }}
                    >
                      <Image
                        source={DogImages[this.state.selectedDogIndex]}
                        style={{ width: 80, height: 80 }}
                      />
                      <Text style={{ fontFamily: "SCBold", fontSize: 10 }}>
                        {" "}
                        {Dogs[this.state.selectedDogIndex]}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        case SignUpState.ShowTutorial:
          return <TutorialScreen GotoMainScreen={this.props.GotoMainScreen} />;
      }
    } else {
      return (
        <ImageBackground
          source={LogoImg}
          style={{ width: "100%", height: "100%" }}
        ></ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    width: "80%",
    height: 125,
    backgroundColor: "#FFFFFF",
    borderColor: "#d4d4d4",
    marginTop: "130%",
    marginLeft: "10%",
    borderRadius: 10,
  },
});
