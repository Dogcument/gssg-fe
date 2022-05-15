import * as React from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { callApiToken } from "../Common/ApiHelper";
import UserInfo from "../Common/UserInfo";

var content = "";
var subject = "";

export class WritingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadFinished: false,
    };
  }

  componentDidMount = async () => {
    subject = this.props.subject;
    this.props.navigation.setOptions({ title: subject });
    this.tryToLoadTempWriting();
  };

  tryToLoadTempWriting = async () => {
    const userInfo = UserInfo.instance;
    const tempWriting = await userInfo.tryToGetTempWriting();
    if (tempWriting != undefined) {
      content = tempWriting;
      this.setState({ loadFinished: true });
    } else {
      content = "";
      this.setState({ loadFinished: false });
    }
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
            style={{
              fontFamily: "Ridi",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              lineHeight: 20,
              // borderRadius: 10,
              // borderWidth: 2,
              // borderColor: '#009688',
            }}
            placeholder="여기에 입력"
            defaultValue={content}
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

    const userInfo = UserInfo.instance;
    userInfo.setTempWriting(userInfo.getNickName(), content);
  }
}

async function RequestPost(navigation) {
  const userInfo = UserInfo.instance;
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
  const userInfo = UserInfo.instance;
  userInfo.clearTempWriting();
  content = "";
  
  return navigation.navigate("CabinetStack", {
    screen: "CabinetScreen",
    params: { subject: subject },
  });
}

export function OnDoneButtonClicked(navigation) {
  if (content == "") {
    alert("글 내용이 없어요!");
    return;
  }

  console.log(content);
  RequestPost(navigation);
}
