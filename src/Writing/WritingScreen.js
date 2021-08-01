import * as React from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./Styles";
import { callApiToken } from "../Common/ApiHelper";
import UserInfo from "../Common/UserInfo";

var content = "";
var subject = "";

export class WritingScreen extends React.Component {
  componentDidMount = async () => {
    subject = this.props.subject;
    this.props.navigation.setOptions({ title: subject });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "95%",
            marginLeft: "2.5%",
          }}
        >
          <TextInput
            style={styles.TextInputStyle}
            placeholder="여기에 입력"
            multiline={true}
            returnKeyType="default"
            onChangeText={(inputText) => this.onChangeText(inputText)}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onChangeText(inputText) {
    content = inputText;
  }
}

async function RequestPost(navigation) {
  const userInfo = UserInfo.get();
  const resp = await callApiToken(
    "posts",
    "POST",
    userInfo.getJwt(),
    JSON.stringify({
      subjectName: subject,
      content: content,
    })
  );

  if (resp == null) {
    alert("posts POST 실패!");
    return;
  }

  onRequestPostSuccess(navigation);
}

function onRequestPostSuccess(navigation) {
  return navigation.navigate("보관함", { screen: "Cabinet" });
}

export function OnDoneButtonClicked(navigation) {
  if (content == "") {
    alert("글 내용이 없어요!");
    return;
  }

  console.log(content);
  RequestPost(navigation);
}
