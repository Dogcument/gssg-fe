import * as React from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { callApiToken } from "./ApiHelper";
import UserInfo from "./UserInfo";
import SegmentedControlTab from "react-native-segmented-control-tab";

let replies = null;
let comment = null;

class CommentComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const likeCount = this.props.likeCount;
    const comment = this.props.comment;
    const nickName = this.props.nickName;
    const profileDog = this.props.profileDog;
    const date = this.props.date;

    return (
      <View>
        <Text>{likeCount}</Text>
        <Text>{nickName}</Text>
        <Text>{date}</Text>
        <Text>{profileDog}</Text>
        <Text>{comment}</Text>
      </View>
    );
  }
}

export class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      respReplyFinished: false,
      selectedIndex: 0,
    };
    this.reqGetReply();
  }

  reqGetReply = async () => {
    const id = this.props.id;
    const userInfo = UserInfo.instance;
    const resp = await callApiToken(
      "posts/" + id + "/replies",
      "GET",
      userInfo.getJwt()
    );

    this.onRespGetReply(resp.replies);
  };

  reqPostReply = async () => {
    if (comment == null || comment == "") {
      alert("코멘트가 비어있습니다.");
      return;
    }

    const userInfo = UserInfo.instance;
    const resp = await callApiToken(
      "replies",
      "POST",
      userInfo.getJwt(),
      JSON.stringify({
        postId: this.props.id,
        content: comment,
      })
    );

    this.onRespPostReply(resp);
  };

  onRespPostReply(resp) {
    this.reqGetReply();
    this.textInput.clear();
  }

  onRespGetReply(inReplies) {
    replies = inReplies;
    this.setState({ respReplyFinished: true });
  }

  onTabSelected = (index) => {
    this.setState({
      selectedIndex: index,
    });
  };

  showReplies(value) {
    return (
      <CommentComponent
        key={value.id}
        comment={value.content}
        likeCount={value.likeCount}
        nickName={value.member.nickname}
        profileDog={value.member.profileDog}
        date={value.createdAt}
      />
    );
  }

  onCommentTextChanged(text) {
    comment = text;
  }

  render() {
    if (!this.state.respReplyFinished) {
      return <View />;
    }

    return (
      <View>
        <SegmentedControlTab
          values={["좋아요 순", "시간 순"]}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.onTabSelected}
        />
        <ScrollView>
          {replies.length == 0
            ? null
            : replies.map((value) => this.showReplies(value))}
        </ScrollView>
        <View>
          <TextInput
            ref={(input) => {
              this.textInput = input;
            }}
            placeholder="여기에 입력"
            multiline={true}
            returnKeyType="default"
            onChangeText={(inputText) => this.onCommentTextChanged(inputText)}
          />
          <TouchableOpacity onPress={() => this.reqPostReply()}>
            <Text>입 력</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
