import * as React from "react";
import { View, Text } from "react-native";
import { ProfileComponent } from "../Common/ProfileComponent";

export class DictionaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: props.post.subject,
      content: props.post.content,
      nickName: props.post.nickName,
      date: props.post.date,
    };
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            background: "#AE9784",
            width: "93.5%",
            height: "3.65rem",
            borderRadius: "0.6rem",
          }}
        >
          {/* TODO - 여기에 유저 프로필 추가 해야하는데, 이미지를 어떻게 받아올지 */}
          <Text style={{ fontSize: "1.28rem" }}>{this.state.subject}</Text>
          <Text style={{ fontSize: "0.6rem" }}>{this.state.nickName}</Text>

          {/* 좋아요/코멘트 수 */}
          <View
            style={{
              width: "2.98rem",
              height: "2.18rem",
              marginRight: "0.84rem",
              background: "#000000",
            }}
          ></View>
        </View>
        {/* 실제 글이 노출되는 부분 */}
        <View
          style={{
            width: "93.5%",
            height: 100,
            background: "#FFFFFF",
            borderRadius: "0.6rem",
          }}
        ></View>
      </View>
    );
  }
}
