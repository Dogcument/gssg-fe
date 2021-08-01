import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./Styles";
import { CabinetItem } from "./CabinetItem";
import { ProtoWritings } from "../Common/ProtoWritings";
import { callApi } from "../Common/ApiHelper";

let posts = null;
export class CabinetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      subject: ProtoWritings[0],
      visibleModal: null,
    };

    this.ReqGetPosts();
  }

  static onWritingsClicked = async () => {
    this.setState({ visibleModal: 1 });
  };

  componentDidMount() {
    const navigation = this.props.navigation;
    navigation.setOptions({ tabBarVisible: true });
  }

  RenderCloseButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress} style={[styles.modalbutton]}>
      <View>
        <Text style={{ fontFamily: "SCBold", fontSize: 20 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  RenderWritingContent() {
    return (
      <View style={[styles.writingContentModal]}>
        <ScrollView>
          {ProtoWritings.map((value) => (
            <TouchableOpacity
              key={value}
              style={{ height: 40 }}
              onPress={() => this.onWritingSubjectClicked(value)}
            >
              <Text style={{ fontFamily: "SCBold" }}>{value}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {this.RenderCloseButton("닫기", () =>
          this.setState({ visibleModal: null })
        )}
      </View>
    );
  }

  onWritingSubjectClicked(subject) {
    console.log(subject);
    this.state.subject = subject;
    this.setState({ visibleModal: subject });
  }

  ReqGetPosts = async () => {
    const resp = await callApi(
      "posts" + "?" + "page=" + 0 + "&" + "size=" + 100,
      "GET",
      null
    );
    if (resp == null) {
      alert("posts GET 실패!");
      return;
    }

    this.onGetPostsSuccess(resp);
  };

  onGetPostsSuccess(resp) {
    posts = resp.posts.content;
    this.setState({ isLoad: true });
  }

  showWritings(post) {
    const subject = post.subject.name;
    if (subject != this.state.subject) {
      return;
    }
    return (
      <CabinetItem
        post={post}
        key={post.createdAt}
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    if (!this.state.isLoad) {
      return <ScrollView></ScrollView>;
    }

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView>
          {
            <View>
              {this.RenderCloseButton(this.state.subject, () =>
                this.setState({ visibleModal: 1 })
              )}
            </View>
          }
          {posts.map((value) => this.showWritings(value))}
        </ScrollView>

        <Modal isVisible={this.state.visibleModal === 1}>
          {this.RenderWritingContent()}
        </Modal>
      </View>
    );
  }
}
