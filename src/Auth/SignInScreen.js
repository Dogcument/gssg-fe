import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import { styles } from "./Styles";

export class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
            fontFamily: "SCThin"
          }}
        />
        <Text style={{fontFamily: "SCBold"}}>비밀번호</Text>
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
            fontFamily: "SCThin"
          }}
        />

        <TouchableOpacity
          onPress={this.props.onSubmitButtonClicked}
          style={[styles.modalbutton]}
        >
          <View>
            <Text style={{ fontFamily: "SpoqaBold", fontSize: 20 }}>
              {" "}
              Submit{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
