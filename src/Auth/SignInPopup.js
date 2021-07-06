import React from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { WritingButtonImg } from "../../assets/ImageList";

import { styles } from "./Styles";

export class SignInPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onEmailTextChanged(value) {
    this.props.onEmailTextChanged(value);
  }

  onPwTextChanged(value) {
    this.props.onPwTextChanged(value);
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "web" ? "height" : "position"}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={[styles.SignInModal]}>
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
              글쑤시개에 오신 것을 환영합니다!
            </Text>
          </View>
          <View style={{ height: "10%" }}></View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingLeft: 5,
              height: "15%",
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15, flex: 3 }}>
              이메일
            </Text>
            <TextInput
              onChangeText={(value) => this.onEmailTextChanged(value)}
              placeholder="이메일을 입력해주세요!"
              placeholderTextColor="#FFFFFF"
              style={{
                fontFamily: "SpoqaMedium",
                fontSize: 12,
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                flex: 7,
                height: "100%",
                paddingLeft: 5,
              }}
            />
          </View>
          <View style={{ height: "10%" }}></View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingLeft: 5,
              height: "15%",
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15, flex: 3 }}>
              비밀번호
            </Text>
            <TextInput
              onChangeText={(value) => this.onPwTextChanged(value)}
              placeholder="비밀번호를 입력해주세요!"
              secureTextEntry={true}
              placeholderTextColor="#FFFFFF"
              style={{
                fontFamily: "SpoqaMedium",
                fontSize: 12,
                backgroundColor: "#d4d4d4",
                borderRadius: 5,
                flex: 7,
                height: "100%",
                paddingLeft: 5,
              }}
            />
          </View>
          <View style={{ height: "10%" }}></View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity onPress={this.props.onSignUpButtonClicked}>
              <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15 }}>
                회원가입
              </Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15 }}>   |   </Text>
            <TouchableOpacity onPress={this.openFindPwPopup}>
              <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15 }}>
                비번찾기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: "2.5%"}}></View>

        <TouchableOpacity
          onPress={this.props.onLoginButtonClicked}
          style={[styles.ModalButton]}
        >
          <View>
            <Text style={{ fontFamily: "SpoqaMedium", fontSize: 15 }}>
              로그인
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
