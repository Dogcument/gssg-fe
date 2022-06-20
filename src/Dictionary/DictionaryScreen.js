import * as React from "react";
import { View, ScrollView, Text } from "react-native";
import { DictionaryItem } from "./DictionaryItem";
export class DictionaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    };

    this.reqDictionaryPosts();
  }

  reqDictionaryPosts() {}

  onRespDictionaryPosts = async () => {
    this.setState;
  };

  createPostWidget(inPost) {
    return <DictionaryItem key={inPost.subject} post={inPost} />;
  }

  emptyPost() {
    return;
  }

  render() {
    let posts = this.state.posts;
    // Tempcode
    // 백엔드 작업될 때 까지 임시로 추가
    posts = [
      {
        subject: "하이",
        content: "이하",
        nickName: "거니",
        date: "2022-06-19",
      },
    ];

    return (
      <View>
        <View
          style={{
            height: "3.93rem",
            background: "#F0E8D0",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: "1rem",
            }}
          >
            표준 멍멍 대사전
          </Text>
        </View>
        <ScrollView>
          {posts != ""
            ? posts.map((iter) => this.createPostWidget(iter))
            : this.emptyPost()}
        </ScrollView>
      </View>
    );
  }
}
